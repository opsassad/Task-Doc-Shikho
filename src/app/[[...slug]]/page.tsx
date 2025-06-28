import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import SearchButton from '../components/SearchButton'
import FileNavigation from '../components/FileNavigation'

// Get the docs directory path
const docsDirectory = path.join(process.cwd(), 'docs')

// Ensure docs directory exists
if (!fs.existsSync(docsDirectory)) {
  fs.mkdirSync(docsDirectory, { recursive: true })
}

// iOS Liquid-style Project Card - Pure Black
function ProjectCard({ item, index = 0 }: { item: { path: string, type: 'file' | 'folder', title: string }, index?: number }) {
  const animationClass = `animate-card-slide-in${index > 0 && index <= 5 ? `-${index}` : ''}`;
  
  return (
    <Link href={`/${item.path}`}>
      <div className={`group relative bg-gray-800/60 backdrop-blur-xl border border-gray-700/40 rounded-3xl p-6 mb-3 hover:bg-gray-800/80 hover:border-gray-600/60 transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-black/30 hover:scale-[1.02] active:scale-[0.98] overflow-hidden ${animationClass}`}>
        
        {/* Liquid morphing background */}
        <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ease-out rounded-3xl ${
          item.type === 'folder' 
            ? 'from-blue-500/0 via-blue-400/0 to-blue-600/0 group-hover:from-blue-500/10 group-hover:via-blue-400/8 group-hover:to-blue-600/10' 
            : 'from-emerald-500/0 via-emerald-400/0 to-emerald-600/0 group-hover:from-emerald-500/10 group-hover:via-emerald-400/8 group-hover:to-emerald-600/10'
        }`}></div>
        
        {/* Floating liquid orb effect - Enhanced for dark mode */}
        <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br rounded-full blur-xl group-hover:scale-150 group-hover:opacity-100 transition-all duration-1000 ease-out ${
          item.type === 'folder' 
            ? 'from-blue-400/30 to-blue-500/30' 
            : 'from-emerald-400/30 to-emerald-500/30'
        }`}></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 relative">
              {/* Liquid icon container */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12 group-active:scale-95 ${
                item.type === 'folder' 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/40 group-hover:shadow-blue-500/60' 
                  : 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/40 group-hover:shadow-emerald-500/60'
              }`}>
                {/* Liquid shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl group-hover:from-white/60 transition-all duration-500"></div>
                
                {item.type === 'folder' ? (
                  <svg className="w-6 h-6 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              {/* Liquid pulse effect */}
              <div className={`absolute inset-0 rounded-2xl animate-ping opacity-0 group-hover:animate-pulse group-hover:opacity-30 ${
                item.type === 'folder' ? 'bg-blue-500' : 'bg-emerald-500'
              }`}></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-100 tracking-tight group-hover:text-white transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-medium group-hover:text-gray-300 transition-colors duration-300">
                {item.type === 'folder' ? 'Project Folder' : 'Documentation'}
              </p>
            </div>
          </div>
          
          {/* Liquid arrow with morphing animation */}
          <div className="flex-shrink-0 relative">
            <div className="w-8 h-8 rounded-xl bg-gray-700/50 group-hover:bg-gray-600/80 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12 group-active:scale-95">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-all duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Get all markdown files and folders for navigation
function getAllPathsAndFolders(dir: string, basePath: string = ''): Array<{path: string, type: 'file' | 'folder', title: string}> {
  const items: Array<{path: string, type: 'file' | 'folder', title: string}> = []
  
  if (!fs.existsSync(dir)) return items
  
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    const relativePath = basePath ? `${basePath}/${file}` : file
    
    if (stat.isDirectory()) {
      items.push({
        path: relativePath,
        type: 'folder',
        title: file.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      })
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const fileName = file.replace(/\.mdx?$/, '')
      items.push({
        path: relativePath.replace(/\.mdx?$/, ''),
        type: 'file',
        title: fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      })
    }
  })
  
  return items
}

// Get sibling files in the same folder for navigation
function getSiblingFiles(slug: string[]): Array<{path: string, title: string, isActive: boolean}> {
  const folderSlug = slug.slice(0, -1) // Remove the current file from the path
  const currentFile = slug[slug.length - 1] // Get the current file name
  const folderPath = path.join(docsDirectory, ...folderSlug)
  
  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    return []
  }
  
  const files = fs.readdirSync(folderPath)
  const siblings: Array<{path: string, title: string, isActive: boolean}> = []
  
  files.forEach(file => {
    const filePath = path.join(folderPath, file)
    const stat = fs.statSync(filePath)
    
    if (!stat.isDirectory() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
      const fileName = file.replace(/\.mdx?$/, '')
      const fullPath = folderSlug.length > 0 
        ? `${folderSlug.join('/')}/${fileName}`
        : fileName
      
      siblings.push({
        path: fullPath,
        title: fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        isActive: fileName === currentFile
      })
    }
  })
  
  // Sort files alphabetically
  siblings.sort((a, b) => a.title.localeCompare(b.title))
  
  return siblings
}

// Get markdown content
function getMarkdownContent(slug: string[]) {
  const fullPath = path.join(docsDirectory, ...slug)
  
  // Try with .md extension
  const mdPath = `${fullPath}.md`
  const mdxPath = `${fullPath}.mdx`
  
  let filePath = ''
  if (fs.existsSync(mdPath)) {
    filePath = mdPath
  } else if (fs.existsSync(mdxPath)) {
    filePath = mdxPath
  } else {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    frontmatter: data,
    content,
  }
}

// Generate static params for all possible paths
export async function generateStaticParams() {
  function getAllPaths(dir: string, basePath: string = ''): string[][] {
    const paths: string[][] = []
    
    if (!fs.existsSync(dir)) return paths
    
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      const relativePath = basePath ? `${basePath}/${file}` : file
      
      if (stat.isDirectory()) {
        // Add folder path - use raw segments for static generation
        const segments = relativePath.split('/')
        paths.push(segments)
        // Recursively get paths from subdirectories
        paths.push(...getAllPaths(filePath, relativePath))
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        // Add file path without extension - use raw segments for static generation
        const pathWithoutExt = relativePath.replace(/\.mdx?$/, '')
        const segments = pathWithoutExt.split('/')
        paths.push(segments)
      }
    })
    
    return paths
  }
  
  const paths = getAllPaths(docsDirectory)
  return paths.map(slug => ({ slug }))
}

// Main page component
export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params
  // Next.js automatically URL decodes the params, so we can use them directly
  const slug = resolvedParams.slug || []
  
  // If no slug, show the main index (HOMEPAGE - Centered Pure Black)
  if (slug.length === 0) {
    const items = getAllPathsAndFolders(docsDirectory)
    
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-12" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
        {/* Search Button - Fixed Position */}
        <div className="fixed top-6 right-6 z-40">
          <SearchButton />
        </div>

        {/* Centered iPhone-style Screen */}
        <div className="w-[28rem] max-w-2xl bg-gray-900/80 backdrop-blur-2xl border border-gray-700/30 rounded-[32px] shadow-2xl shadow-black/30 overflow-hidden min-h-[500px]">
          {/* Project Cards Area */}
          <div className="p-5 min-h-[500px] flex flex-col">
            {items.length > 0 ? (
              <div className="space-y-6">
                {items.map((item, index) => (
                  <ProjectCard key={item.path} item={item} index={index + 1} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 flex-1 flex flex-col justify-center">
                {/* Pure black empty state */}
                <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-inner relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-600/50 to-transparent rounded-3xl"></div>
                  <svg className="w-10 h-10 text-gray-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-100 mb-2">No projects yet</h3>
                <p className="text-sm text-gray-400 mb-4">Add folders to get started</p>
                <code className="px-4 py-2 bg-gray-800/80 text-gray-300 rounded-2xl text-xs font-medium backdrop-blur-sm border border-gray-700/50">docs/My-Project/</code>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  // Check if it's a folder view
  const currentPath = path.join(docsDirectory, ...slug)
  if (fs.existsSync(currentPath) && fs.statSync(currentPath).isDirectory()) {
    const items = getAllPathsAndFolders(currentPath, slug.join('/'))
    const currentTitle = slug[slug.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-12" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
        {/* Search Button - Fixed Position */}
        <div className="fixed top-6 right-6 z-40">
          <SearchButton />
        </div>

        <div className="w-[28rem] max-w-2xl bg-gray-900/80 backdrop-blur-2xl border border-gray-700/30 rounded-[32px] shadow-2xl shadow-black/30 overflow-hidden min-h-[500px]">
          {/* Breadcrumb Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-800/60 via-gray-900/40 to-slate-800/60 border-b border-gray-700/40 animate-slide-down-fade">
            <nav className="text-xs text-gray-400 mb-2 font-medium animate-fade-in-up-delay">
              <Link href="/" className="hover:text-blue-400 transition-colors duration-300">Home</Link>
              {slug.map((segment, index) => (
                <span key={index}>
                  <span className="mx-1.5 text-gray-600">/</span>
                  {index === slug.length - 1 ? (
                    <span className="text-gray-100 font-semibold">{segment.replace(/-/g, ' ')}</span>
                  ) : (
                    <Link 
                      href={`/${slug.slice(0, index + 1).join('/')}`}
                      className="hover:text-blue-400 transition-colors duration-300"
                    >
                      {segment.replace(/-/g, ' ')}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
            <h1 className="text-lg font-bold text-gray-100 tracking-tight animate-fade-in-up-delay-2">{currentTitle}</h1>
          </div>
          
          <div className="p-5 min-h-[400px]">
            <div className="space-y-6">
              {items.map((item, index) => (
                <ProjectCard key={item.path} item={item} index={index + 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Try to get markdown content
  const post = getMarkdownContent(slug)
  
  if (!post) {
    notFound()
  }

  // Get sibling files for navigation
  const siblingFiles = getSiblingFiles(slug)
  const currentFolder = slug.length > 1 ? slug.slice(0, -1).join(' / ') : 'Root'
  
  return (
    <div className="min-h-screen bg-black py-12" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
      {/* Search Button - Fixed Position */}
      <div className="fixed top-6 right-6 z-40">
        <SearchButton />
      </div>

      {/* Back Button */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-4xl px-4">
          <Link 
            href="/"
            className="inline-flex items-center space-x-3 text-sm font-medium text-gray-300 hover:text-blue-400 transition-all duration-500 bg-gray-800/70 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-lg border border-gray-700/40 hover:bg-gray-800/90 hover:scale-105 active:scale-95 group"
          >
            <div className="w-6 h-6 rounded-xl bg-gray-700 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-x-1">
              <svg className="w-3 h-3 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="group-hover:translate-x-1 transition-transform duration-300">Back to Projects</span>
          </Link>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 flex justify-center">
          <div className="text-sm text-gray-400 font-medium bg-gray-800/50 backdrop-blur-xl px-4 py-2 rounded-2xl border border-gray-700/40">
            <Link href="/" className="hover:text-blue-400 transition-colors duration-300">Home</Link>
            {slug.map((segment, index) => (
              <span key={index}>
                <span className="mx-2 text-gray-600">/</span>
                {index === slug.length - 1 ? (
                  <span className="text-gray-100 font-semibold">{segment.replace(/-/g, ' ')}</span>
                ) : (
                  <Link 
                    href={`/${slug.slice(0, index + 1).join('/')}`}
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    {segment.replace(/-/g, ' ')}
                  </Link>
                )}
              </span>
            ))}
          </div>
        </nav>
        
        {/* Article Container */}
        <article className="p-8">
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-100 prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-700/80 prose-code:text-gray-200 prose-code:px-3 prose-code:py-1 prose-code:rounded-xl prose-code:text-sm prose-pre:bg-gray-900 prose-pre:rounded-3xl prose-pre:border prose-pre:border-gray-700 prose-strong:text-gray-200 prose-em:text-gray-300 prose-blockquote:border-l-blue-500 prose-blockquote:text-gray-300 prose-li:text-gray-300 prose-ul:list-disc prose-ol:list-decimal prose-table:text-gray-300 prose-thead:text-gray-200 prose-th:border-gray-600 prose-td:border-gray-600 prose-th:bg-gray-700/50 prose-tr:border-gray-600">
            <MDXRemote 
              source={post.content} 
              options={{
                mdxOptions: {
                  remarkPlugins: [
                    remarkGfm,
                    remarkEmoji,
                    remarkMath
                  ],
                  rehypePlugins: [
                    rehypeHighlight,
                    rehypeKatex,
                    rehypeSlug,
                    rehypeAutolinkHeadings
                  ]
                }
              }}
            />
          </div>
        </article>

        {/* Fixed File Navigation */}
        <FileNavigation 
          files={siblingFiles}
          currentFolder={currentFolder}
        />
      </div>
    </div>
  )
} 