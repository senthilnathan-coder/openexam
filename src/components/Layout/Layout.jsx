import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaQuestionCircle, FaListAlt, FaRobot, FaChartBar, FaUpload, FaCalendar, FaSearch, FaBell, FaUser } from 'react-icons/fa';

const Layout = ({ children }) => {
  const menuItems = [
    { icon: <FaChartLine />, label: 'Dashboard', path: '/' },
    { icon: <FaQuestionCircle />, label: 'Questions', path: '/questions' },
    { icon: <FaListAlt />, label: 'Topics', path: '/topics' },
    { icon: <FaRobot />, label: 'AI Review', path: '/review' },
    { icon: <FaChartBar />, label: 'Analytics', path: '/analytics' },
    { icon: <FaUpload />, label: 'Upload', path: '/upload' },
    { icon: <FaCalendar />, label: 'Schedule', path: '/schedule' }
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 fixed h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-8">AI Quiz Admin</h2>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="bg-gray-800 h-16 fixed w-[calc(100%-16rem)] z-10">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center bg-gray-700 rounded-lg w-64">
              <FaSearch className="ml-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-0 text-white p-2 focus:outline-none w-full"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <FaBell />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <FaUser className="text-white" />
                </div>
                <span className="text-white">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="pt-16 p-6 bg-gray-900 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;