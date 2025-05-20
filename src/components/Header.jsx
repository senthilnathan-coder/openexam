// src/components/Header.jsx
import React, { useState } from 'react';
import { TbBrandOpenai } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import {
    FaUserCircle, FaGlobe, FaCheck,
    FaSignOutAlt, FaTachometerAlt, FaSignInAlt
} from 'react-icons/fa';
import Select from 'react-select';
import company from "../assets/Logo.png";
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Must return { user, logout }
    const [selectedCountry, setSelectedCountry] = useState({ value: 'US', label: '🇺🇸 English (US)' });
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const countryOptions = [
        { value: 'US', label: '🇺🇸 English (US)', region: 'North America' },
        { value: 'GB', label: '🇬🇧 English (UK)', region: 'Europe' },
        { value: 'IN', label: '🇮🇳 हिंदी', region: 'Asia' },
        { value: 'ES', label: '🇪🇸 Español', region: 'Europe' },
        { value: 'FR', label: '🇫🇷 Français', region: 'Europe' },
        { value: 'DE', label: '🇩🇪 Deutsch', region: 'Europe' },
        { value: 'IT', label: '🇮🇹 Italiano', region: 'Europe' },
        { value: 'PT', label: '🇵🇹 Português', region: 'Europe' },
        { value: 'BR', label: '🇧🇷 Português (Brasil)', region: 'South America' },
        { value: 'RU', label: '🇷🇺 Русский', region: 'Europe' },
        { value: 'JP', label: '🇯🇵 日本語', region: 'Asia' },
        { value: 'KR', label: '🇰🇷 한국어', region: 'Asia' },
        { value: 'CN', label: '🇨🇳 中文 (简体)', region: 'Asia' },
        { value: 'TW', label: '🇹🇼 中文 (繁體)', region: 'Asia' },
        { value: 'AR', label: '🇸🇦 العربية', region: 'Middle East' },
        { value: 'TR', label: '🇹🇷 Türkçe', region: 'Europe' },
        { value: 'VN', label: '🇻🇳 Tiếng Việt', region: 'Asia' },
        { value: 'TH', label: '🇹🇭 ไทย', region: 'Asia' },
    ];

    const customStyles = {
        control: (base) => ({
            ...base,
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            minHeight: 'unset',
            width: '40px',
        }),
        dropdownIndicator: () => ({ display: 'none' }),
        indicatorSeparator: () => ({ display: 'none' }),
        menu: (base) => ({
            ...base,
            background: '#1a1f2e',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            padding: '0.5rem',
            width: '250px',
        }),
        group: (base) => ({
            ...base,
            padding: '0.5rem 0',
            '&:not(:last-child)': {
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            },
        }),
        groupHeading: (base) => ({
            ...base,
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
        }),
        option: (base, state) => ({
            ...base,
            background: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            borderRadius: '0.5rem',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            '&:hover': {
                background: 'rgba(255, 255, 255, 0.15)',
            },
            '&:active': {
                background: 'rgba(255, 255, 255, 0.2)',
            },
        }),
        singleValue: (base) => ({
            ...base,
            color: 'rgba(255, 255, 255, 0.8)',
        }),
    };

    const groupedOptions = countryOptions.reduce((acc, option) => {
        const group = acc.find(g => g.label === option.region);
        if (group) {
            group.options.push(option);
        } else {
            acc.push({
                label: option.region,
                options: [option],
            });
        }
        return acc;
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className='bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-6 py-4 fixed w-full top-0 z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center backdrop-blur-lg bg-white/10 rounded'>
                <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
                    <img src={company} alt='Logo' className="w-32 h-auto" />
                </div>

                <div className='flex items-center gap-4 px-4'>
                    <div className="relative bottom-3">
                        <Select
                            placeholder='Select a country'
                            options={groupedOptions}
                            styles={customStyles}
                            isSearchable={false}
                            value={selectedCountry}
                            onChange={setSelectedCountry}
                            formatGroupLabel={(data) => (
                                <div className="flex items-center justify-between">
                                    <span>{data.label}</span>
                                    <span className="bg-white/10 px-2 py-1 rounded-full text-xs">
                                        {data.options.length}
                                    </span>
                                </div>
                            )}
                            components={{
                                SingleValue: () => (
                                    <FaGlobe size={22} className="text-white/80 hover:text-white transition-colors" />
                                ),
                                Option: ({ data, isSelected, ...props }) => (
                                    <div {...props} className="flex items-center justify-between px-2">
                                        <span>{data.label}</span>
                                        {isSelected && <FaCheck className="text-green-400" size={12} />}
                                    </div>
                                )
                            }}
                        />
                    </div>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20"
                            >
                                {user.profile ? (
                                    <img 
                                        src={typeof user.profile === 'string' && user.profile.trim() !== '' 
                                            ? user.profile 
                                            : 'https://via.placeholder.com/150'
                                        } 
                                        alt="Profile" 
                                        className="w-8 h-8 rounded-full object-cover" 
                                    />
                                ) : (
                                    <FaUserCircle className="text-2xl text-white/80" />
                                )}
                                <span className="text-white/80">{user.full_name}</span>
                            </button>

                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-lg py-1 border border-white/10 z-50">
                                    <button
                                        onClick={() => navigate('/userdashboard')}
                                        className="flex items-center gap-2 px-4 py-2 text-white/80 hover:bg-white/10 w-full text-left"
                                    >
                                        <FaTachometerAlt />
                                        Dashboard
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-4 py-2 text-white/80 hover:bg-white/10 w-full text-left"
                                    >
                                        <FaSignOutAlt />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-5 py-2.5 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            <FaSignInAlt />
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
