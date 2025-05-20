import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const UserDashboard = () => {
  const { user, loading: authLoading } = useAuth();  // Use loading from context
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return; // Wait until auth is ready

    const fetchDashboard = async () => {
      if (!user || !user._id) {
        setError("Please log in to view your dashboard");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/userdashboard/${user._id}/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });

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
          Welcome, {user.full_name || 'User'}
        </h1>
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add your dashboard content here */}
            <pre className="bg-white p-4 rounded shadow-md col-span-full">{JSON.stringify(dashboardData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
