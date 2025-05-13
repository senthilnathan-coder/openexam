import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserShield, FaBrain, FaUserTie, FaUserCog, FaUserGraduate, FaEdit, FaTrash, FaPlus, FaChartBar } from 'react-icons/fa';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('admins');

  const adminRoles = [
    { 
      id: 1, 
      role: 'Quiz Master Admin', 
      users: 2, 
      status: 'active', 
      permissions: 'AI Quiz Creation and Management' 
    },
    { 
      id: 2, 
      role: 'Content Validation Admin', 
      users: 3, 
      status: 'active', 
      permissions: 'Quiz Content Verification' 
    },
    { 
      id: 3, 
      role: 'Student Performance Admin', 
      users: 2, 
      status: 'active', 
      permissions: 'Performance Analytics' 
    },
    { 
      id: 4, 
      role: 'User Support Admin', 
      users: 2, 
      status: 'active', 
      permissions: 'User Management & Support' 
    },
    { 
      id: 5, 
      role: 'AI System Admin', 
      users: 1, 
      status: 'active', 
      permissions: 'AI Engine Configuration' 
    }
  ];

  const users = [
    { 
      id: 1, 
      name: 'John Doe', 
      role: 'Student', 
      quizzesTaken: 15,
      avgScore: '85%',
      status: 'active', 
      lastQuiz: '2 hours ago' 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      role: 'Teacher', 
      quizzesTaken: 8,
      avgScore: '92%',
      status: 'active', 
      lastQuiz: '1 day ago' 
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      role: 'Student', 
      quizzesTaken: 12,
      avgScore: '78%',
      status: 'inactive', 
      lastQuiz: '5 days ago' 
    }
  ];

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">AI Quiz Administration</h1>
            <p className="text-blue-300 mt-2">Manage AI-powered quiz system</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveSection('admins')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'admins' ? 'bg-blue-500 text-white' : 'bg-white/10 text-blue-300'
              }`}
            >
              <FaUserShield className="inline mr-2" />
              Admin Management
            </button>
            <button 
              onClick={() => setActiveSection('users')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'users' ? 'bg-blue-500 text-white' : 'bg-white/10 text-blue-300'
              }`}
            >
              <FaUsers className="inline mr-2" />
              User Management
            </button>
          </div>
        </div>

        {activeSection === 'admins' ? (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <FaBrain className="text-blue-400" />
                AI Quiz Admin Roles
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <FaPlus /> Add Admin Role
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {adminRoles.map((admin) => (
                <div key={admin.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <FaUserTie className="text-blue-400 text-2xl" />
                      <div>
                        <h3 className="text-white font-semibold text-lg">{admin.role}</h3>
                        <p className="text-blue-300 text-sm">{admin.permissions}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                        {admin.users} active
                      </span>
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30">
                          <FaEdit />
                        </button>
                        <button className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <FaUserGraduate className="text-blue-400" />
                Quiz User Management
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <FaPlus /> Add New User
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-black/20">
                  <tr>
                    <th className="text-left text-white p-4">User</th>
                    <th className="text-left text-white p-4">Role</th>
                    <th className="text-left text-white p-4">Quizzes Taken</th>
                    <th className="text-left text-white p-4">Avg Score</th>
                    <th className="text-left text-white p-4">Last Quiz</th>
                    <th className="text-left text-white p-4">Status</th>
                    <th className="text-left text-white p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t border-white/10">
                      <td className="p-4 text-white">{user.name}</td>
                      <td className="p-4 text-blue-300">{user.role}</td>
                      <td className="p-4 text-white">{user.quizzesTaken}</td>
                      <td className="p-4 text-green-400">{user.avgScore}</td>
                      <td className="p-4 text-blue-300">{user.lastQuiz}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          user.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30">
                            <FaChartBar title="View Analytics" />
                          </button>
                          <button className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30">
                            <FaEdit title="Edit User" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;