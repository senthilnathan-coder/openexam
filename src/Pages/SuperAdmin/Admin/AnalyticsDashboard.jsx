import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const performanceData = [
  { name: 'Week 1', users: 120, quizzes: 45 },
  { name: 'Week 2', users: 150, quizzes: 60 },
  { name: 'Week 3', users: 180, quizzes: 75 },
  { name: 'Week 4', users: 220, quizzes: 90 },
]

const categoryData = [
  { name: 'Programming', attempts: 450, avgScore: 76 },
  { name: 'Web Dev', attempts: 380, avgScore: 82 },
  { name: 'Database', attempts: 290, avgScore: 71 },
  { name: 'DevOps', attempts: 220, avgScore: 68 },
]

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">User Activity</h3>
          <LineChart width={500} height={300} data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
            <Line type="monotone" dataKey="quizzes" stroke="#82ca9d" />
          </LineChart>
        </div>

        {/* Category Performance */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Category Performance</h3>
          <BarChart width={500} height={300} data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="attempts" fill="#8884d8" />
            <Bar dataKey="avgScore" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Top Performing Users</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <h4 className="font-semibold">User {i}</h4>
                  <p className="text-sm text-gray-500">Score: {90 - (i * 5)}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard