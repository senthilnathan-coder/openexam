import React from 'react'
import { motion } from 'framer-motion'

const Navigation = () => {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between container mx-auto py-2 px-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-2 text-gray-400">🔍</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            🔔
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✉️
          </motion.button>
          <div className="h-5 w-px bg-gray-200"></div>
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm font-medium">
              A
            </div>
            <span className="text-sm font-medium text-gray-700">Arun</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Navigation