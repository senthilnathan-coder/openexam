import React, { useState } from 'react'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', lastLogin: '2024-03-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Suspended', lastLogin: '2024-02-28' },
]

const UserManagement = () => {
  const [selectedRole, setSelectedRole] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <div className="flex space-x-4">
          <select
            className="border rounded-lg px-3 py-2"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option>All Roles</option>
            <option>Student</option>
            <option>Teacher</option>
            <option>Admin</option>
          </select>
          <select
            className="border rounded-lg px-3 py-2"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="py-3">Name</th>
            <th className="py-3">Email</th>
            <th className="py-3">Role</th>
            <th className="py-3">Status</th>
            <th className="py-3">Last Login</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-3">{user.name}</td>
              <td className="py-3">{user.email}</td>
              <td className="py-3">{user.role}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-sm ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {user.status}
                </span>
              </td>
              <td className="py-3">{user.lastLogin}</td>
              <td className="py-3">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Suspend</button>
                  <button className="text-gray-600 hover:text-gray-800">Logs</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserManagement