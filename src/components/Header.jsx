import React, { useState } from 'react';
// import { TbWorld } from "react-icons/tb";
import { FaUserCog } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/" },
    { label: "Services", path: "/" },
    { label: "Blogs", path: "/" },
    { label: "Contact Us", path: "/" },
];

const Header = () => {
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        navigate('login');
    };

    return (
        <nav className='bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 fixed w-full top-0 z-50 shadow-lg'>
            <div className='flex justify-between items-center max-w-full mx-auto'>
                {/* Logo */}
                <div className='flex items-center space-x-2'>
                    <img src={logo} alt="Logo" className="h-12 w-auto hover:scale-105 transition-transform duration-300" />
                </div>
                
                {/* Navigation */}
                <div className='flex gap-7'>
                <div className='hidden md:flex items-center space-x-8'>
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="text-gray-300 hover:text-white hover:scale-105 transition-all duration-300 font-medium"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Admin Login Button */}
                <button
                    onClick={handleAdminLogin}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 shadow-md"
                >
                    <FaUserCog className="text-lg" />
                    <span> Login</span>
                </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;