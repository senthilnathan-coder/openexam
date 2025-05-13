import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-900">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-blue-500/30 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/80"></div>
            </div>
            <div className="relative z-10">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;