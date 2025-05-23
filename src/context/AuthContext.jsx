import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Load user from localStorage on init
    const [user, setUser] = useState(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth).user : null;
    });
    const [loading, setLoading] = useState(false);

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/user/signin/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Login failed');

            // Store user and token in localStorage
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

    // Signup function (accepts FormData for profile image upload)
    const signup = async (formData) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/user/signup/', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Signup failed');

            // Store user and token
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

    // Fetch updated user profile data
    const fetchUserProfile = async () => {
        if (!user?._id) return null;
        try {
            const response = await fetch(`http://localhost:8000/userdashboard/${user._id}/`);
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();
            const updatedUser = { ...user, ...data.user };
            // Update localStorage and context state
            localStorage.setItem('auth', JSON.stringify({ user: updatedUser, token: JSON.parse(localStorage.getItem('auth')).token }));
            setUser(updatedUser);
            return updatedUser;
        } catch (error) {
            console.error('Profile fetch error:', error);
            return null;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('auth');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                signup,
                logout,
                fetchUserProfile,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook for easier context usage
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
