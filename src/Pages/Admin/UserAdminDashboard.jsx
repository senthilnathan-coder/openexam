import React, { useState, useEffect } from 'react';
import { FaUsers, FaChartBar, FaClipboardList, FaTrophy, FaClock, FaGraduationCap, FaChartPie } from 'react-icons/fa';

const UserAdminDashboard = () => {
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalQuizzes: 0,
    completionRate: 0,
    averageScore: 0,
    totalParticipants: 0,
    averageTime: 0,
    topPerformers: 0
  });

  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [quizPerformance, setQuizPerformance] = useState([]);

  useEffect(() => {
    // Fetch user admin dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user-admin/dashboard-stats/');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Quiz Management Dashboard</h1>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<FaClipboardList />} title="Total Quizzes" value={stats.totalQuizzes} />
          <StatCard icon={<FaTrophy />} title="Avg. Score" value={`${stats.averageScore}%`} />
          <StatCard icon={<FaClock />} title="Avg. Time" value={`${stats.averageTime} min`} />
          <StatCard icon={<FaUsers />} title="Participants" value={stats.totalParticipants} />
        </div>

        {/* Quiz Performance Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaChartPie className="text-purple-400" />
              Quiz Performance
            </h2>
            <div className="space-y-4">
              {['Easy', 'Medium', 'Hard'].map((level) => (
                <div key={level} className="flex items-center justify-between">
                  <span className="text-white">{level}</span>
                  <div className="w-2/3 bg-white/5 rounded-full h-4">
                    <div 
                      className="bg-purple-500 h-full rounded-full"
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaGraduationCap className="text-purple-400" />
              Top Performing Topics
            </h2>
            <div className="space-y-3">
              {['JavaScript', 'Python', 'React', 'Node.js'].map((topic) => (
                <div key={topic} className="flex items-center justify-between text-white">
                  <span>{topic}</span>
                  <span className="text-purple-300">{Math.floor(Math.random() * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Quiz Activities */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Recent Quiz Activities</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-purple-500/30">
                  <th className="py-3 text-left">Quiz Title</th>
                  <th className="py-3 text-left">Participants</th>
                  <th className="py-3 text-left">Avg. Score</th>
                  <th className="py-3 text-left">Completion Rate</th>
                  <th className="py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <tr key={index} className="border-b border-purple-500/10">
                    <td className="py-3">Quiz {index + 1}</td>
                    <td className="py-3">{Math.floor(Math.random() * 100)}</td>
                    <td className="py-3">{Math.floor(Math.random() * 100)}%</td>
                    <td className="py-3">{Math.floor(Math.random() * 100)}%</td>
                    <td className="py-3">{new Date().toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard
            title="Create New Quiz"
            description="Design and publish new quizzes"
            onClick={() => {/* Implement create quiz */}}
          />
          <QuickActionCard
            title="Quiz Analytics"
            description="View detailed performance metrics"
            onClick={() => {/* Implement analytics */}}
          />
          <QuickActionCard
            title="Question Bank"
            description="Manage quiz questions"
            onClick={() => {/* Implement question bank */}}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
    <div className="flex items-center gap-4">
      <div className="text-purple-400 text-2xl">{icon}</div>
      <div>
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-purple-200 text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

const QuickActionCard = ({ title, description, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-left hover:bg-white/20 transition-all w-full"
  >
    <h3 className="text-white text-lg font-semibold">{title}</h3>
    <p className="text-purple-200 mt-2">{description}</p>
  </button>
);

export default UserAdminDashboard;