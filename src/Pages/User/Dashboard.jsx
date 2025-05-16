import React, { useState, useEffect } from 'react';
import { FaTrophy, FaChartLine, FaExclamationTriangle, FaMedal, FaCoins, FaCrown, FaBookmark, FaHistory, FaFileInvoice, FaUserPlus, FaComments } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId'); // Get from your auth system

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API delay with shorter timeout (500ms)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Dummy data for development
      const dummyData = {
        user_profile: {
          full_name: "John Doe",
          email: "john@example.com",
          profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        },
        quiz_statistics: {
          streak: {
            current: 5,
            longest: 12
          },
          total_attempts: 48,
          average_score: 78,
          best_score: 95,
          total_points: 1250,
          recent_scores: [
            { date: '2024-01-01', score: 85, type: 'Math', difficulty: 'medium', total: 100 },
            { date: '2024-01-02', score: 92, type: 'Science', difficulty: 'hard', total: 100 },
            { date: '2024-01-03', score: 78, type: 'History', difficulty: 'easy', total: 100 },
            { date: '2024-01-04', score: 88, type: 'Geography', difficulty: 'medium', total: 100 },
            { date: '2024-01-05', score: 95, type: 'Physics', difficulty: 'hard', total: 100 }
          ]
        },
        activity_summary: {
          by_difficulty: {
            easy: 15,
            medium: 22,
            hard: 11
          }
        }
      };

      setDashboardData(dummyData);
      setLoading(false); // Make sure to set loading to false after data is set
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    } finally {
      setLoading(false); // Ensure loading is set to false even if there's an error
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-900 to-purple-900 flex items-center justify-center ">
        <div className="animate-spin text-purple-500 text-4xl">⚡</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-purple-900 p-6 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">My Dashboard</h1>
            <p className="text-purple-200">Welcome back, {dashboardData?.user_profile?.full_name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white text-center">
              <p className="text-sm text-purple-200">Streak</p>
              <p className="text-2xl font-bold">{dashboardData?.quiz_statistics?.streak?.current} days</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <img
                src={dashboardData?.user_profile?.profile_image}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FaTrophy />}
            title="Total Attempts"
            value={dashboardData?.quiz_statistics?.total_attempts}
            color="from-purple-500 to-pink-500"
          />
          <StatCard
            icon={<FaChartLine />}
            title="Average Score"
            value={`${dashboardData?.quiz_statistics?.average_score}%`}
            color="from-blue-500 to-cyan-500"
          />
          <StatCard
            icon={<FaMedal />}
            title="Best Score"
            value={`${dashboardData?.quiz_statistics?.best_score}%`}
            color="from-green-500 to-emerald-500"
          />
          <StatCard
            icon={<FaCoins />}
            title="Total Points"
            value={dashboardData?.quiz_statistics?.total_points || 0}
            color="from-yellow-500 to-orange-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Progress Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData?.quiz_statistics?.recent_scores}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="date" stroke="#ffffff80" />
                <YAxis stroke="#ffffff80" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Activity by Difficulty</h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(dashboardData?.activity_summary?.by_difficulty || {}).map(([level, count]) => (
                <div key={level} className="text-center">
                  <div className={`h-20 rounded-lg bg-gradient-to-r ${
                    level === 'easy' ? 'from-green-500 to-emerald-500' :
                    level === 'medium' ? 'from-yellow-500 to-orange-500' :
                    'from-red-500 to-pink-500'
                  } flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-white">{count}</span>
                  </div>
                  <p className="mt-2 text-purple-200 capitalize">{level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {dashboardData?.quiz_statistics?.recent_scores?.map((activity, index) => (
              <div key={index} className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                <div>
                  <p className="text-white">{activity.type} Quiz</p>
                  <p className="text-sm text-purple-200">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{activity.score}/{activity.total}</p>
                  <p className="text-sm text-purple-200 capitalize">{activity.difficulty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className={`bg-gradient-to-r ${color} rounded-2xl p-6 transform hover:scale-[1.02] transition-all`}>
    <div className="flex items-center text-white/90 mb-2">{icon}</div>
    <h3 className="text-white text-lg font-semibold">{title}</h3>
    <p className="text-white text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default UserDashboard;