import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './Navigation'

const adminMenuItems = [
  { 
    icon: '👥',
    label: 'User Management',
    badge: '23',
    submenu: [
      { label: 'View Users', icon: '👁️' },
      { label: 'Suspend/Delete Users', icon: '🚫' },
      { label: 'Filter by Role/Status', icon: '🔍' },
      { label: 'Audit Logs', icon: '📋' }
    ]
  },
  { 
    icon: '📝',
    label: 'Quiz Management',
    badge: '5',
    submenu: [
      { label: 'List Quizzes', icon: '📜' },
      { label: 'Preview/Edit/Delete', icon: '✏️' },
      { label: 'Quiz Stats', icon: '📊' }
    ]
  },
  { 
    icon: '❓',
    label: 'Question Bank',
    badge: '120',
    submenu: [
      { label: 'View All Questions', icon: '📖' },
      { label: 'Filter Questions', icon: '🔍' },
      { label: 'Add/Edit Questions', icon: '✏️' }
    ]
  },
  { 
    icon: '📚',
    label: 'Category & Topic',
    submenu: [
      { label: 'Manage Categories', icon: '📁' },
      { label: 'Manage Topics', icon: '🏷️' }
    ]
  },
  { 
    icon: '📊',
    label: 'Analytics',
    submenu: [
      { label: 'Top Performing Users', icon: '🏆' },
      { label: 'Most Attempted Quizzes', icon: '📈' },
      { label: 'Category Performance', icon: '📊' },
      { label: 'Time Analysis', icon: '⏱️' }
    ]
  },
  { 
    icon: '⚙️',
    label: 'System Settings',
    submenu: [
      { label: 'Control Access', icon: '🔐' },
      { label: 'View System Logs', icon: '📋' }
    ]
  },
  { 
    icon: '📚',
    label: 'My Courses',
    submenu: [
      { label: 'All Courses', icon: '📖' },
      { label: 'In Progress', icon: '🔄' },
      { label: 'Completed', icon: '✅' }
    ]
  },
  { 
    icon: '📊',
    label: 'My Progress',
    submenu: [
      { label: 'Overview', icon: '📈' },
      { label: 'Achievements', icon: '🏆' }
    ]
  },
  { 
    icon: '⚙️',
    label: 'Settings',
    submenu: [
      { label: 'Profile', icon: '👤' },
      { label: 'Preferences', icon: '🔧' }
    ]
  }
]



const AdminLayout = ({  isAdmin = true }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [activeItem, setActiveItem] = useState('')
  const [expandedItems, setExpandedItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Filter menu items based on search
  const filteredMenuItems = (isAdmin ? adminMenuItems : adminMenuItems).filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.submenu?.some(subItem =>
      subItem.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleItemClick = (label) => {
    if (isAdmin) {
      if (expandedItems.includes(label)) {
        setExpandedItems(expandedItems.filter(item => item !== label))
      } else {
        setExpandedItems([...expandedItems, label])
      }
    } else if (label === 'My Courses') {
      setExpandedItems(prev => 
        prev.includes('My Courses') 
          ? prev.filter(item => item !== 'My Courses')
          : [...prev, 'My Courses']
      )
    }
    setActiveItem(label)
  }

  const handleSubmenuClick = (parentLabel, submenuLabel) => {
    setActiveItem(`${parentLabel}-${submenuLabel}`)
  }

  return (
    <div className="flex ">
      <motion.div
        initial={{ x: -264 }}
        animate={{ x: isOpen ? 0 : -264 }}
        className="w-73 bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col z-50"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-1 top-8 bg-white rounded-full w-6 h-6 shadow-md flex items-center justify-center"
        >
          <span className="transform transition-transform duration-200" style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}>
            ➜
          </span>
        </button>

        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
              F
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Super_Admin</h2>
              <p className="text-xs text-gray-500">superadmin@gmail.com</p>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 pt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Menu Items with Search */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex justify-between items-center">
              <span>{isAdmin ? 'Admin Menu' : 'Main Menu'}</span>
              <span className="text-xs text-gray-400">{filteredMenuItems.length} items</span>
            </h3>

            {/* Animated Menu Container */}
            <motion.div
              layout
              className="space-y-1"
            >
              {filteredMenuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <motion.div
                    whileHover={{ x: 4, backgroundColor: "rgba(79, 70, 229, 0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleItemClick(item.label)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group
                      ${activeItem === item.label ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'hover:bg-gray-50'}`}
                  >
                    <motion.span 
                      className="text-xl group-hover:scale-110 transition-transform duration-200"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-600 rounded-full"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                    {item.submenu && (
                      <motion.span
                        animate={{ rotate: expandedItems.includes(item.label) ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-400 text-sm"
                      >
                        ▼
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Enhanced Submenu Animation */}
                  <AnimatePresence>
                    {item.submenu && expandedItems.includes(item.label) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: 1, 
                          height: 'auto',
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        exit={{ 
                          opacity: 0, 
                          height: 0,
                          transition: { duration: 0.2, ease: "easeIn" }
                        }}
                        className="overflow-hidden ml-4 mt-1"
                      >
                        {item.submenu.map((submenuItem, subIndex) => (
                          <motion.div
                            key={subIndex}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: subIndex * 0.1 }}
                            whileHover={{ x: 4, backgroundColor: "rgba(79, 70, 229, 0.05)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSubmenuClick(item.label, submenuItem.label)}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group
                              ${activeItem === `${item.label}-${submenuItem.label}` ? 'text-indigo-600 bg-indigo-50/50' : 'text-gray-600'}`}
                          >
                            <motion.span 
                              className="text-sm group-hover:scale-110 transition-transform duration-200"
                              whileHover={{ rotate: [0, -10, 10, 0] }}
                            >
                              {submenuItem.icon}
                            </motion.span>
                            <span className="text-sm">{submenuItem.label}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-600 group">
            <span className="text-xl group-hover:scale-110 transition-transform duration-200">❓</span>
            <span className="text-sm font-medium">Help Center</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      {/* <div className={`flex-1 ${isOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        
        <main className="p-6">
          {children}
        </main>
      </div> */}
    </div>
  )
}

export default AdminLayout