import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            // Clear any existing user data first
            localStorage.removeItem('user');
            setUser(null);

            const mockUser = {
                id: Date.now().toString(), // Unique ID for each login
                email: email,
                full_name: email.split('@')[0],
                profile: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random&size=200`,
                role: 'user',
                lastLogin: new Date().toISOString()
            };
            
            // Set new user data
            localStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
            return { success: true, user: mockUser };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            localStorage.clear(); // Clear all storage instead of just user
            setUser(null);
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    };

    // Force update user state when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const savedUser = localStorage.getItem('user');
            setUser(savedUser ? JSON.parse(savedUser) : null);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const value = {
        user,
        loading,
        login,
        logout,
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
