import React from 'react'

const Header = () => {
  return (
    <div className="bg-indigo-900 rounded-lg p-6 mb-8 relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-white text-2xl font-semibold">Welcome Back, Super_Admin!</h1>
        <p className="text-indigo-200 mt-1">See what happened with your courses and students!</p>
      </div>
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-50"></div>
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-10"></div>
      </div>
    </div>
  )
}

export default Header