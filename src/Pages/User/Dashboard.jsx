import React, { useState, useEffect, useContext, useCallback } from 'react';
import { FaFire, FaChartLine, FaBullseye, FaTrophy, FaCoins, FaStar, FaHistory, FaCreditCard, FaUsers, FaComments } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext'; // Add this import

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState({
    streakData: { current: 0, longest: 0 },
    progressData: [],
    weakTopics: [],
    leaderboard: { rank: 0, totalUsers: 0 },
    points: { current: 0, monthly: 0 },
    planUsage: { used: 0, total: 0 },
    savedQuizzes: [],
    attemptHistory: [],
    referrals: { count: 0, earnings: 0 }
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    if (!document.hidden && user?.id) {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`http://127.0.0.1:8000/api/dashboard/${user.id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            window.location.href = '/login';
            return;
          }
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        
        // Store dashboard data in localStorage for persistence
        localStorage.setItem('dashboardData', JSON.stringify(data));
        
        setDashboardData({
          streakData: {
            current: data.streak_info?.current_streak || 0,
            longest: data.streak_info?.longest_streak || 0
          },
          progressData: data.quiz_statistics?.learning_curve || [],
          weakTopics: data.quiz_statistics?.weak_topics || [],
          leaderboard: {
            rank: data.points_info?.rank || 0,
            totalUsers: data.points_info?.total_users || 0
          },
          points: {
            current: data.points_info?.total_points || 0,
            monthly: data.points_info?.monthly_points || 0
          },
          planUsage: {
            used: data.subscription_info?.used_credits || 0,
            total: data.subscription_info?.total_credits || 0
          },
          savedQuizzes: data.saved_quizzes || [],
          attemptHistory: data.quiz_attempts || [],
          referrals: {
            count: data.referral_info?.total_referrals || 0,
            earnings: data.referral_info?.total_earnings || 0
          }
        });
        setLoading(false);
      } catch (error) {
        console.error('Dashboard fetch error:', error);
        // Try to load data from localStorage if fetch fails
        const cachedData = localStorage.getItem('dashboardData');
        if (cachedData) {
          setDashboardData(JSON.parse(cachedData));
        }
        toast.error(error.message || 'Failed to load dashboard data');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user]);

  // Load cached data on initial mount
  useEffect(() => {
    const cachedData = localStorage.getItem('dashboardData');
    if (cachedData) {
      setDashboardData(JSON.parse(cachedData));
    }
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Optimize visibility change handler
  useEffect(() => {
    let timeoutId;
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Debounce the fetch call
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fetchDashboardData, 300);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    fetchDashboardData();
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timeoutId);
    };
  }, [fetchDashboardData]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Update the loading check
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-900 to-purple-900 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl text-purple-500"
        >
          ⚡
        </motion.div>
      </div>
    );
  }

  // Remove the null check since we have default values now
  return (
    <>
      <motion.div
        className="min-h-screen bg-gradient-to-r from-slate-900 to-purple-900 p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-center items-center mb-6 sm:mb-8 w-4/12">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">User Dashboard</h1>
              <p className="text-purple-200 mt-1 sm:mt-2">Welcome back, User</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto space-y-6">
            {/* Streak Section */}
            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <FaFire className="text-orange-500 mr-2" /> Daily Streak
              </h2>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-orange-500">{dashboardData.streakData.current}</div>
                <div className="text-purple-200">days</div>
                <div className="text-sm text-purple-300">(Longest: {dashboardData.streakData.longest} days)</div>
              </div>
            </motion.div>
            {/* Progress Chart */}
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaChartLine className="text-blue-400 text-3xl" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Your Progress</span>
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dashboardData.progressData}>
                  <defs>
                    <linearGradient id="progressColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                  <XAxis
                    dataKey="date"
                    stroke="#ffffff90"
                    tick={{ fill: '#ffffff90', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff30' }}
                  />
                  <YAxis
                    stroke="#ffffff90"
                    tick={{ fill: '#ffffff90', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff30' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30, 41, 59, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      color: '#fff',
                      padding: '12px'
                    }}
                    itemStyle={{ color: '#60a5fa' }}
                    cursor={{ stroke: '#60a5fa', strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#progressColor)"
                    dot={{ fill: '#60a5fa', strokeWidth: 2, stroke: '#fff', r: 4 }}
                    activeDot={{ r: 8, stroke: '#fff', strokeWidth: 3 }}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Weak Topics Radar section */}
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaBullseye className="text-red-400 text-3xl" />
                <span className="bg-gradient-to-r from-red-400 to-orange-400 text-transparent bg-clip-text">Areas for Improvement</span>
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={dashboardData.weakTopics} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="#ffffff20" />
                  <PolarAngleAxis
                    dataKey="subject"
                    stroke="#ffffff90"
                    tick={{ fill: '#ffffff90', fontSize: 13 }}
                    axisLine={{ stroke: '#ffffff30' }}
                  />
                  <PolarRadiusAxis
                    stroke="#ffffff50"
                    tick={{ fill: '#ffffff80', fontSize: 12 }}
                    angle={30}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#f87171"
                    fill="#f87171"
                    fillOpacity={0.5}
                    animationDuration={2000}
                  >
                    {dashboardData.weakTopics.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={`hsl(${index * 60}, 80%, 65%, 0.6)`}
                        stroke={`hsl(${index * 60}, 80%, 65%)`}
                      />
                    ))}
                  </Radar>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30, 41, 59, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      color: '#fff',
                      padding: '12px'
                    }}
                    cursor={false}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{
                      color: '#ffffff90',
                      fontSize: '13px',
                      padding: '16px'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* StatCard with enhanced animations */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <StatCard
                icon={<FaTrophy className="text-3xl text-yellow-300" />}
                title="Leaderboard Rank"
                value={`#${dashboardData.leaderboard.rank}`}
                subtitle={
                  <div className="flex items-center gap-2">
                    <span>Top</span>
                    <span className="text-white font-bold">
                      {Math.round((dashboardData.leaderboard.rank / dashboardData.leaderboard.totalUsers) * 100)}%
                    </span>
                    <span>of users</span>
                  </div>
                }
                color="from-yellow-400 via-orange-400 to-red-400"
              />
              <StatCard
                icon={<FaCoins className="text-3xl text-emerald-300" />}
                title="Total Points"
                value={dashboardData.points.current}
                subtitle={`${dashboardData.points.monthly} points this month`}
                color="from-emerald-400 via-teal-400 to-cyan-400"
              />
              <StatCard
                icon={<FaUsers className="text-3xl text-purple-300" />}
                title="Referrals"
                value={dashboardData.referrals.count}
                subtitle={`Earned ${dashboardData.referrals.earnings} points`}
                color="from-purple-400 via-violet-400 to-indigo-400"
              />
            </motion.div>

            {/* Recent Activity with enhanced design */}
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaHistory className="text-purple-400 text-3xl" />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Recent Activity</span>
              </h2>
              <div className="space-y-4">
                {dashboardData.attemptHistory.map((attempt, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 rounded-xl p-6 flex justify-between items-center hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div>
                      <div className="text-white font-semibold text-lg">{attempt.quiz}</div>
                      <div className="text-purple-300 text-sm mt-1">{attempt.date}</div>
                    </div>
                    <div className="text-2xl font-bold text-emerald-400">{attempt.score}%</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quiz Performance Bar Chart */}
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaChartLine className="text-indigo-400 text-3xl" />
                <span className="bg-gradient-to-r from-indigo-400 to-blue-400 text-transparent bg-clip-text">Quiz Performance</span>
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData.savedQuizzes}>
                  <defs>
                    <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                  <XAxis
                    dataKey="title"
                    stroke="#ffffff90"
                    tick={{ fill: '#ffffff90', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff30' }}
                  />
                  <YAxis
                    stroke="#ffffff90"
                    tick={{ fill: '#ffffff90', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff30' }}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30, 41, 59, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      color: '#fff',
                      padding: '12px'
                    }}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                  />
                  <Bar
                    dataKey="score"
                    fill="url(#barColor)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Topic Distribution Pie Chart */}
            <motion.div 
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaChartLine className="text-fuchsia-400 text-3xl" />
                <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 text-transparent bg-clip-text">Topic Distribution</span>
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.weakTopics}
                    dataKey="score"
                    nameKey="subject"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  >
                    {dashboardData.weakTopics.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`hsl(${index * 90}, 70%, 65%)`}
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30, 41, 59, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      color: '#fff',
                      padding: '12px'
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{
                      color: '#ffffff90',
                      fontSize: '13px',
                      padding: '16px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// Enhanced StatCard component with animations
const StatCard = ({ icon, title, value, subtitle, color }) => (
  <motion.div
    whileHover={{ scale: 1.03, translateY: -5 }}
    whileTap={{ scale: 0.98 }}
    className={`bg-gradient-to-r ${color} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300`}
  >
    <motion.div
      className="flex items-center text-white/90 mb-2"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-white text-lg font-semibold tracking-wide">{title}</h3>
    <motion.p
      className="text-white text-3xl font-bold mt-2"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {value}
    </motion.p>
    <div className="text-white/80 text-sm mt-2 font-medium">{subtitle}</div>
  </motion.div>
);

export default UserDashboard;

