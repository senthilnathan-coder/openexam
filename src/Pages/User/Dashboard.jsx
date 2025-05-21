import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const UserDashboard = () => {
  const { user, loading: authLoading } = useAuth();  // Use loading from context
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    const fetchDashboard = async () => {
      // Get user data from localStorage if not available in context
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const currentUser = user || storedUser;

      console.log('Current User Data:', currentUser); // Debug log

      if (!currentUser || !currentUser._id) { // Changed back to _id
        setError("Please log in to view your dashboard");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/userdashboard/${currentUser._id}`, {
          headers: {
            Authorization: `Bearer ${currentUser.access_token || currentUser.token}`, // Check both token formats
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });

        console.log('API Response:', response); // Debug log

        if (!response.data) {
          throw new Error('No data received from server');
        }

        setDashboardData(response.data);
        setError(null);
      } catch (error) {
        console.error('Dashboard Error:', error);

        if (error.response?.status === 500) {
          setError("Server error. Please try again later.");
        } else if (error.response?.status === 404) {
          setError("User dashboard not found.");
        } else if (error.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else {
          setError(error.response?.data?.message || error.message || "Failed to load dashboard");
        }

        setDashboardData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-10">
          <p className="text-red-500 mb-4">Please log in to view your dashboard</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-10">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome, {user?.full_name || user?.name || 'User'}
        </h1>
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <div className="space-y-3">
                <p><span className="font-medium">Name:</span> {currentUser?.full_name}</p>
                <p><span className="font-medium">Email:</span> {currentUser?.email}</p>
                <p><span className="font-medium">Member Since:</span> {currentUser?.created_at ? new Date(currentUser.created_at).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Activity Stats</h2>
              <div className="space-y-3">
                <p><span className="font-medium">Total Quizzes:</span> {dashboardData.total_quizzes || 0}</p>
                <p><span className="font-medium">Completed Quizzes:</span> {dashboardData.completed_quizzes || 0}</p>
                <p><span className="font-medium">Average Score:</span> {dashboardData.average_score || 0}%</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              {dashboardData.recent_activities ? (
                <ul className="space-y-2">
                  {dashboardData.recent_activities.map((activity, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {activity.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No recent activity</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;