'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface FileItem {
  path: string
  title: string
  isActive: boolean
}

interface FileNavigationProps {
  files: FileItem[]
  currentFolder: string
}

export default function FileNavigation({ files, currentFolder }: FileNavigationProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (files.length <= 1) {
    return null // Don't show navigation if there's only one file
  }

  if (!mounted) {
    return null // Don't render on server to avoid hydration mismatch
  }

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 w-80 h-fit z-30 max-w-[calc(100vw-2rem)] sm:max-w-80">
      {/* Hover trigger area */}
      <div className="absolute -left-12 top-0 w-16 h-full bg-transparent hover:bg-gray-500/5 rounded-l-2xl transition-all duration-300 hidden sm:block"></div>
      
      <div className="group bg-black/60 backdrop-blur-md border border-gray-600/40 rounded-l-2xl p-4 opacity-30 hover:opacity-100 focus-within:opacity-100 hover:bg-black/80 focus-within:bg-black/80 hover:border-gray-400/80 focus-within:border-gray-400/80 hover:shadow-2xl focus-within:shadow-2xl transform translate-x-6 hover:translate-x-0 focus-within:translate-x-0 transition-all duration-500 ease-out animate-fade-in-right">
        {/* Subtle indicator when not hovered */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-gradient-to-b from-blue-400/80 to-purple-400/80 rounded-full group-hover:h-24 group-hover:w-2 group-hover:from-blue-300/90 group-hover:to-purple-300/90 group-focus-within:h-24 group-focus-within:w-2 group-focus-within:from-blue-300/90 group-focus-within:to-purple-300/90 transition-all duration-500 shadow-lg shadow-blue-500/20"></div>
        
        {/* Mobile touch target */}
        <div className="absolute -left-3 top-0 w-6 h-full bg-transparent rounded-l-2xl sm:hidden"></div>
        
        {/* Header */}
        <div className="mb-4 pb-3 border-b border-gray-500/50 group-hover:border-gray-300/70 transition-all duration-300">
          <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white tracking-tight transition-all duration-300">
            Files in folder
          </h3>
          <p className="text-xs text-gray-300 group-hover:text-gray-100 mt-1 truncate transition-all duration-300" title={currentFolder}>
            {currentFolder}
          </p>
        </div>

        {/* File List */}
        <nav className="space-y-1 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin">
          {files.map((file) => (
            <Link
              key={file.path}
              href={`/${file.path}`}
              className={`nav-item block w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                file.isActive
                  ? 'text-blue-200 group-hover:text-blue-100 border border-blue-400/70 group-hover:border-blue-300/90 shadow-lg bg-blue-500/25 group-hover:bg-blue-500/35'
                  : 'text-gray-200 group-hover:text-white hover:text-white hover:border-gray-400/60 hover:bg-gray-700/30 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* File Icon */}
                <div className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  file.isActive
                    ? 'bg-blue-500/40 group-hover:bg-blue-500/60 text-blue-200 group-hover:text-blue-100'
                    : 'bg-gray-600/50 group-hover:bg-gray-500/70 text-gray-200 group-hover:text-white'
                }`}>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* File Name */}
                <span className="flex-1 truncate font-medium">
                  {file.title}
                </span>

                {/* Active Indicator */}
                {file.isActive && (
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-300 animate-pulse group-hover:bg-blue-200 shadow-lg shadow-blue-400/40"></div>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-500/50 group-hover:border-gray-300/70 transition-all duration-300">
          <p className="text-xs text-gray-300 group-hover:text-gray-100 text-center transition-all duration-300">
            {files.length} file{files.length !== 1 ? 's' : ''} in folder
          </p>
        </div>
      </div>
    </div>
  )
} 