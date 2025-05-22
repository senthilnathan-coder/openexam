import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth).user : null;
    });
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/user/signin/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            const authData = { user: data.user, token: data.token };
            localStorage.setItem('auth', JSON.stringify(authData));
            setUser(data.user);
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const signup = async (formData) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/user/signup/', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            const authData = { user: data.user, token: data.token };
            localStorage.setItem('auth', JSON.stringify(authData));
            setUser(data.user);
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProfile = async () => {
        if (!user?.id) return null;
        try {
            const response = await fetch(`http://localhost:8000/userdashboard/${user._id}/`, {
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();
            const updatedUser = { ...user, ...data };
            const storedAuth = JSON.parse(localStorage.getItem('auth')) || {};
            storedAuth.user = updatedUser;
            localStorage.setItem('auth', JSON.stringify(storedAuth));
            setUser(updatedUser);
            return updatedUser;
        } catch (error) {
            console.error('Profile fetch error:', error);
            return null;
        }
    };

    const fetchDashboardData = async () => {
        if (!user?.id) return null;
        try {
            const token = JSON.parse(localStorage.getItem('auth'))?.token;
            const response = await fetch(`http://localhost:8000/userdashboard/${user._id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            if (!response.ok) throw new Error('Failed to fetch dashboard data');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Dashboard fetch error:', error);
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem('auth');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, fetchUserProfile, fetchDashboardData, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
