import React from 'react'

const courses = [
  { name: 'UI Design', sales: 265, amount: '$9125.00', icon: '🎨' },
  { name: 'Prototyping', sales: 198, amount: '$3564.00', icon: '⚡' },
  { name: 'UX Design', sales: 102, amount: '$1632.00', icon: '🎯' },
  { name: 'Webflow', sales: 54, amount: '$1152.00', icon: '🌊' },
  { name: 'Framer', sales: 72, amount: '$720.00', icon: '🖼️' },
]

const TopCourse = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Top Courses</h2>
        <button className="text-gray-500 hover:text-gray-700">See All</button>
      </div>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{course.icon}</span>
              <div>
                <h3 className="font-medium">{course.name}</h3>
                <p className="text-sm text-gray-500">{course.sales} Sales</p>
              </div>
            </div>
            <p className="font-semibold">{course.amount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopCourse