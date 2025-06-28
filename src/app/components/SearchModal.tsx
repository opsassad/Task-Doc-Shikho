'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  type: 'file' | 'folder' | 'content'
  path: string
  title: string
  excerpt?: string
  matches?: string[]
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setResults(data.results || [])
      setSelectedIndex(0)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleResultClick = useCallback((result: SearchResult) => {
    // Use the path directly as Next.js handles URL encoding
    router.push(`/${result.path}`)
    onClose()
    setQuery('')
  }, [router, onClose])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex])
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose, handleResultClick])

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          </div>
        )
      case 'file':
        return (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case 'content':
        return (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-400/30 text-yellow-200 rounded px-1">
          {part}
        </mark>
      ) : part
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-16">
        <div className="w-full max-w-2xl bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/50 overflow-hidden animate-in slide-in-from-top-4 duration-200">
          {/* Search Input */}
          <div className="flex items-center px-6 py-4 border-b border-gray-700/50">
            <div className="flex items-center space-x-3 flex-1">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search files, folders, and content..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 outline-none text-lg"
              />
            </div>
            
            {isLoading && (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent" />
            )}
            
            <button
              onClick={onClose}
              className="ml-4 p-1 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query && !isLoading && results.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">No results found for &ldquo;{query}&rdquo;</p>
              </div>
            )}

            {results.map((result, index) => (
              <button
                key={`${result.type}-${result.path}`}
                onClick={() => handleResultClick(result)}
                className={`w-full text-left px-6 py-4 hover:bg-gray-700/50 transition-colors ${
                  index === selectedIndex ? 'bg-gray-700/50' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  {getResultIcon(result.type)}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-gray-100 font-medium truncate">
                        {highlightMatch(result.title, query)}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        result.type === 'folder' ? 'bg-blue-500/20 text-blue-300' :
                        result.type === 'file' ? 'bg-emerald-500/20 text-emerald-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {result.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm truncate">
                      {result.path}
                    </p>
                    
                    {result.excerpt && (
                      <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                        {highlightMatch(result.excerpt, query)}
                      </p>
                    )}
                    
                    {result.matches && result.matches.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {result.matches.slice(0, 3).map((match, i) => (
                          <span key={i} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded">
                            {highlightMatch(match, query)}
                          </span>
                        ))}
                        {result.matches.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{result.matches.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-700/50 bg-gray-800/50">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">↑↓</kbd>
                    <span>navigate</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">↵</kbd>
                    <span>select</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">esc</kbd>
                    <span>close</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 