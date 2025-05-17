import React from 'react'

const courses = [
  { name: 'Tips & Trick UI Design', category: 'UI Design', amount: '$25.00', date: '01-03-2024', status: 'Active' },
  { name: 'UX Fundamental', category: 'UX Design', amount: '$18.00', date: '29-02-2024', status: 'Active' },
  { name: 'Prototyping', category: 'Prototyping', amount: '$16.00', date: '24-02-2024', status: 'Active' },
  { name: 'Webflow', category: 'Webflow', amount: '$12.00', date: '12-02-2024', status: 'Active' },
]

const CourseTable = () => {
  return (
    <div className="bg-white rounded-lg shadow mt-8">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <button className="text-indigo-600 border-b-2 border-indigo-600 px-4 py-2">All Course</button>
            <button className="text-gray-500 hover:text-gray-700 px-4 py-2">Students</button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">Filter</button>
            <button className="text-gray-500 hover:text-gray-700">Sort</button>
            <button className="text-gray-500 hover:text-gray-700">⋮</button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="pb-4">Name</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Date</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="py-4">{course.name}</td>
                <td className="py-4">{course.category}</td>
                <td className="py-4">{course.amount}</td>
                <td className="py-4">{course.date}</td>
                <td className="py-4">
                  <span className="text-green-500">• {course.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseTable