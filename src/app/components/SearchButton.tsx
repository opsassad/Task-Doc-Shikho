'use client'

import { useState, useEffect } from 'react'
import SearchModal from './SearchModal'

export default function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Global keyboard shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="group relative bg-gray-800/70 hover:bg-gray-800/90 backdrop-blur-xl border border-gray-700/40 hover:border-gray-600/60 rounded-2xl px-4 py-2.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
      >
        <div className="flex items-center space-x-3">
          {/* Search Icon */}
          <div className="relative">
            <svg 
              className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </div>
          
          {/* Search Text */}
          <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300 font-medium">
            Search
          </span>
          
          {/* Keyboard Shortcut */}
          <div className="flex items-center space-x-1">
            <kbd className="px-2 py-1 bg-gray-700/50 group-hover:bg-gray-600/50 text-gray-400 group-hover:text-gray-300 rounded text-xs font-medium transition-all duration-300 border border-gray-600/30">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Hover gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 rounded-2xl transition-all duration-500 ease-out" />
      </button>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  )
} 