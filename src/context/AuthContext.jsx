import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState(null);

    // Move login function before the value object
    const login = async (email, password) => {
        setLoading(true);
        try {
            localStorage.removeItem('user');
            setUser(null);

            const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            const userData = {
                id: data.user.id,
                email: data.user.email,
                full_name: data.user.full_name || email.split('@')[0],
                profile: data.user.profile || `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random&size=200`,
                role: data.user.role || 'user',
                lastLogin: new Date().toISOString()
            };

            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return { success: true, user: userData };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Move logout function before the value object
    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            // Clear storage first for immediate feedback
            localStorage.clear();
            setUser(null);

            const response = await fetch('http://127.0.0.1:8000/api/auth/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            // Even if server logout fails, ensure local logout succeeds
            localStorage.clear();
            setUser(null);
            return { success: true };
        }
    };

    // Move fetchDashboardData before the value object
    // Update the fetchDashboardData function
    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token || !user) return null;
    
            const response = await fetch(`http://127.0.0.1:8000/userdashboard/${user.id}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data');
            }
    
            const data = await response.json();
            setDashboardData(data);
            return data;
        } catch (error) {
            console.error('Dashboard fetch error:', error);
            return null;
        }
    };

    // Move value object to the end
    const value = {
        user,
        loading,
        dashboardData,
        login,
        logout,
        fetchDashboardData,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
