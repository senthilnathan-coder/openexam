import React from 'react'

const StatsCards = ({ title, value, percentage, isIncrease }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <span className={`${isIncrease ? 'text-green-500' : 'text-red-500'} text-sm`}>
          {isIncrease ? '↑' : '↓'} {Math.abs(percentage)}%
        </span>
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}

export default StatsCards