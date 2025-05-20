import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);

 useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/userdashboard/${user.id}/`);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };
  if (user?.id) fetchDashboard();
}, [user]);

if (!dashboardData) {
  return <div className="text-center p-10">Loading Dashboard...</div>;
}

const {
  profile,
  current_streak,
  max_streak,
  points,
  subscription,
  quiz_stats,
  saved_quizzes,
  payment_history,
  suggestion_feedback,
  summary_data,
  recent_activity
} = dashboardData;

  return (
    <div className="p-6 md:p-10 bg-[#f9f9f9] min-h-screen space-y-10">
      {/* Header Section */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <img
            src={profile.image}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-500">{subscription}</p>
          </div>
        </div>
        <div className="flex gap-8 text-center">
          <div>
            <h3 className="text-lg font-bold text-indigo-600">{points}</h3>
            <p className="text-gray-600">Points</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-orange-500">{current_streak}</h3>
            <p className="text-gray-600">Current Streak</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-green-500">{max_streak}</h3>
            <p className="text-gray-600">Max Streak</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {summary_data &&
          Object.entries(summary_data).map(([key, value], i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <p className="text-sm text-gray-500 capitalize">{key.replace(/_/g, " ")}</p>
              <h3 className="text-xl font-bold text-indigo-600">{value}</h3>
            </motion.div>
          ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Quiz Stats</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Correct", value: quiz_stats.correct },
                  { name: "Wrong", value: quiz_stats.wrong },
                  { name: "Skipped", value: quiz_stats.skipped },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {COLORS.map((color, i) => (
                  <Cell key={i} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={recent_activity}>
              <XAxis dataKey="date" />
              <Tooltip />
              <Bar dataKey="score" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Saved Quizzes */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Saved Quizzes</h3>
        <ul className="space-y-2">
          {saved_quizzes.map((quiz, i) => (
            <li key={i} className="flex justify-between items-center border-b py-2">
              <span>{quiz.title}</span>
              <button className="text-sm text-blue-500 underline">Resume</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Payment & Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment History */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Payment History</h3>
          <ul className="text-sm divide-y">
            {payment_history.map((item, i) => (
              <li key={i} className="py-2 flex justify-between">
                <span>{item.date}</span>
                <span className="font-semibold">{item.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Feedback */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Suggestion Feedback</h3>
          <ul className="text-sm divide-y">
            {suggestion_feedback.map((item, i) => (
              <li key={i} className="py-2">
                <p className="text-gray-800">{item.message}</p>
                <span className="text-xs text-gray-500">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
