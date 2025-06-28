import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface SearchResult {
  type: 'file' | 'folder' | 'content'
  path: string
  title: string
  excerpt?: string
  matches?: string[]
}

const docsDirectory = path.join(process.cwd(), 'docs')

// Helper function to get all files and folders
function getAllItems(dir: string, basePath: string = ''): Array<{
  path: string
  type: 'file' | 'folder'
  title: string
  content?: string
}> {
  const items: Array<{
    path: string
    type: 'file' | 'folder'
    title: string
    content?: string
  }> = []

  if (!fs.existsSync(dir)) return items

  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    const relativePath = basePath ? `${basePath}/${file}` : file

    if (stat.isDirectory()) {
      // Add folder
      items.push({
        path: relativePath,
        type: 'folder',
        title: file.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      })
      // Recursively get items from subdirectories
      items.push(...getAllItems(filePath, relativePath))
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      // Add file
      const fileName = file.replace(/\.mdx?$/, '')
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      items.push({
        path: relativePath.replace(/\.mdx?$/, ''),
        type: 'file',
        title: data.title || fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        content: content
      })
    }
  })

  return items
}

// Helper function to extract text content (remove markdown syntax)
function extractTextContent(markdown: string): string {
  return markdown
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]*`/g, '')
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove links but keep text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '')
    // Remove bold/italic
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\*([^*]*)\*/g, '$1')
    // Remove other markdown syntax
    .replace(/[#*_~`]/g, '')
    // Clean up whitespace
    .replace(/\s+/g, ' ')
    .trim()
}

// Helper function to find matches in content
function findContentMatches(content: string, query: string): string[] {
  const textContent = extractTextContent(content)
  const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const queryWords = query.toLowerCase().split(/\s+/)
  
  const matches: string[] = []
  
  sentences.forEach(sentence => {
    const lowerSentence = sentence.toLowerCase()
    const hasMatch = queryWords.some(word => lowerSentence.includes(word))
    
    if (hasMatch) {
      matches.push(sentence.trim())
    }
  })
  
  return matches.slice(0, 5) // Limit to 5 matches
}

// Helper function to create excerpt
function createExcerpt(content: string, query: string, maxLength: number = 150): string {
  const textContent = extractTextContent(content)
  const queryWords = query.toLowerCase().split(/\s+/)
  
  // Find the first occurrence of any query word
  let startIndex = 0
  for (const word of queryWords) {
    const index = textContent.toLowerCase().indexOf(word)
    if (index !== -1) {
      startIndex = Math.max(0, index - 50)
      break
    }
  }
  
  let excerpt = textContent.slice(startIndex, startIndex + maxLength)
  
  // Ensure we don't cut off in the middle of a word
  if (startIndex > 0) {
    const firstSpace = excerpt.indexOf(' ')
    if (firstSpace !== -1) {
      excerpt = excerpt.slice(firstSpace + 1)
    }
    excerpt = '...' + excerpt
  }
  
  if (startIndex + maxLength < textContent.length) {
    const lastSpace = excerpt.lastIndexOf(' ')
    if (lastSpace !== -1) {
      excerpt = excerpt.slice(0, lastSpace)
    }
    excerpt = excerpt + '...'
  }
  
  return excerpt
}

// Main search function
function performSearch(query: string): SearchResult[] {
  const results: SearchResult[] = []
  const items = getAllItems(docsDirectory)
  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/)

  items.forEach(item => {
    const titleLower = item.title.toLowerCase()
    const pathLower = item.path.toLowerCase()
    
    // Check for title matches
    const titleMatches = queryWords.some(word => titleLower.includes(word))
    
    // Check for path matches
    const pathMatches = queryWords.some(word => pathLower.includes(word))
    
    if (titleMatches || pathMatches) {
      if (item.type === 'folder') {
        results.push({
          type: 'folder',
          path: item.path,
          title: item.title
        })
      } else {
        results.push({
          type: 'file',
          path: item.path,
          title: item.title,
          excerpt: item.content ? createExcerpt(item.content, query) : undefined
        })
      }
    }
    
    // For files, also search content
    if (item.type === 'file' && item.content) {
      const contentLower = extractTextContent(item.content).toLowerCase()
      const contentMatches = queryWords.some(word => contentLower.includes(word))
      
      if (contentMatches && !titleMatches && !pathMatches) {
        const matches = findContentMatches(item.content, query)
        
        results.push({
          type: 'content',
          path: item.path,
          title: item.title,
          excerpt: createExcerpt(item.content, query),
          matches: matches
        })
      }
    }
  })

  // Sort results by relevance
  return results.sort((a, b) => {
    // Prioritize exact title matches
    const aExactTitle = a.title.toLowerCase() === queryLower
    const bExactTitle = b.title.toLowerCase() === queryLower
    if (aExactTitle && !bExactTitle) return -1
    if (!aExactTitle && bExactTitle) return 1
    
    // Prioritize folders, then files, then content
    const typeOrder = { folder: 0, file: 1, content: 2 }
    const aOrder = typeOrder[a.type]
    const bOrder = typeOrder[b.type]
    if (aOrder !== bOrder) return aOrder - bOrder
    
    // Sort alphabetically within same type
    return a.title.localeCompare(b.title)
  }).slice(0, 20) // Limit to 20 results
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] })
    }

    const results = performSearch(query.trim())

    return NextResponse.json({ 
      results,
      query: query.trim(),
      total: results.length
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Search failed', results: [] },
      { status: 500 }
    )
  }
} 