import React, { useState } from 'react'
import StatsCard from '../Dashboard/StatsCards'

const SuperAdminDashboard = () => {
  const [selectedView, setSelectedView] = useState('all')
  const [timeFilter, setTimeFilter] = useState('today')

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Activity Monitoring Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">System Updates Monitor</h2>
          <p className="text-sm text-gray-600">Real-time updates from all dashboards</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm bg-white shadow-sm"
          >
            <option value="all">All Updates</option>
            <option value="admin">Admin Updates</option>
            <option value="user">User Updates</option>
          </select>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm bg-white shadow-sm"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Admin Dashboard Updates */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Admin Dashboard Activities</h3>
        <div className="space-y-4">
          {/* Questions Upload Updates */}
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Questions Upload Status</h4>
              <span className="text-sm text-gray-500">Last updated: 5 mins ago</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">New Questions</p>
                <p className="text-xl font-semibold text-green-600">125</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Under Review</p>
                <p className="text-xl font-semibold text-yellow-600">45</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Published Today</p>
                <p className="text-xl font-semibold text-blue-600">80</p>
              </div>
            </div>
          </div>

          {/* Topics Management Updates */}
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Topics Management</h4>
              <span className="text-sm text-gray-500">Last updated: 15 mins ago</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">New Topics</p>
                <p className="text-xl font-semibold text-purple-600">8</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Updated Topics</p>
                <p className="text-xl font-semibold text-indigo-600">12</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Archived</p>
                <p className="text-xl font-semibold text-pink-600">3</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Trending</p>
                <p className="text-xl font-semibold text-orange-600">5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Dashboard Updates */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">User Activities Monitor</h3>
        <div className="space-y-4">
          {/* Quiz Participation */}
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Quiz Participation</h4>
              <span className="text-sm text-gray-500">Real-time</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-xl font-semibold text-blue-600">234</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-xl font-semibold text-green-600">567</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Avg Score</p>
                <p className="text-xl font-semibold text-yellow-600">78%</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Streak Leaders</p>
                <p className="text-xl font-semibold text-purple-600">45</p>
              </div>
            </div>
          </div>

          {/* User Progress Updates */}
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Learning Progress</h4>
              <span className="text-sm text-gray-500">Today's Overview</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Topics Mastered</p>
                <p className="text-xl font-semibold text-indigo-600">89</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Weak Areas Identified</p>
                <p className="text-xl font-semibold text-pink-600">34</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Improvement Rate</p>
                <p className="text-xl font-semibold text-orange-600">+15%</p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Recent Transactions</h4>
              <span className="text-sm text-gray-500">Last Hour</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">User</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Plan</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="text-sm">
                    <td className="px-4 py-2">John Doe</td>
                    <td className="px-4 py-2">Premium</td>
                    <td className="px-4 py-2">$29.99</td>
                    <td className="px-4 py-2"><span className="text-green-600">●</span> Success</td>
                  </tr>
                  <tr className="text-sm">
                    <td className="px-4 py-2">Jane Smith</td>
                    <td className="px-4 py-2">Basic</td>
                    <td className="px-4 py-2">$9.99</td>
                    <td className="px-4 py-2"><span className="text-green-600">●</span> Success</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* System Health Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">System Load</h4>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold text-gray-900">67%</p>
            <div className="w-16 h-16 rounded-full border-4 border-green-200 border-t-green-600 animate-spin"></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Response Time</h4>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold text-gray-900">245ms</p>
            <span className="text-green-600 text-2xl">↓</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Error Rate</h4>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold text-gray-900">0.12%</p>
            <span className="text-green-600 text-2xl">↓</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Active Sessions</h4>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold text-gray-900">1,234</p>
            <span className="text-green-600 text-2xl">↑</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminDashboard