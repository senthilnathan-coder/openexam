import React, { useState } from 'react';
import { TbWorld, TbBrandOpenai } from "react-icons/tb";
import { IoCaretDownOutline } from "react-icons/io5";
import { SiGoogleforms } from 'react-icons/si';
import { MdAssignment, MdQuiz, MdSchool } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';

const menuItems = [
    { icon: <TbBrandOpenai size={22} />, label: "Home", color: "text-blue-500", path: "/home" },
    { icon: <SiGoogleforms size={20} />, label: "Online Exam", color: "text-red-500", path: "/online-exam" },
    { icon: <MdQuiz size={20} />, label: "Quizzes", color: "text-orange-500", path: "/quizzes" },
    { icon: <MdAssignment size={20} />, label: "Paper Exams", color: "text-purple-500", path: "/paper-exams" },
    { icon: <MdAssignment size={20} />, label: "Code Assignment", color: "text-blue-500", path: "/code-assignment" },
    { icon: <MdAssignment size={20} />, label: "Paper Assignment", color: "text-pink-500", path: "/paper-assignment" },
    { icon: <MdSchool size={20} />, label: "Interactive Lessons", color: "text-green-500", path: "/lessons" },
    { icon: <TbBrandOpenai size={20} />, label: "AI Quiz Generator", color: "text-indigo-500", path: "/ai-questions" },
    // { icon: <MdQuiz size={20} />, label: "AI Questions", color: "text-yellow-500", path: "/aiquizzes" },
];

const Header = () => {
    const [selectedItem, setSelectedItem] = useState(menuItems[0]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleMenuClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
        navigate(item.path);
    };

    const handleAdminLogin = () => {
        navigate('login');
    };


    return (
        <div className='bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-6 py-4 fixed w-full top-0 z-50'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center backdrop-blur-lg bg-white/10 rounded-2xl p-2'>
                    <div className='relative'>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl px-4 py-2 text-white hover:shadow-lg transition-all duration-300'
                        >
                            <span className='text-white/90'>{selectedItem.icon}</span>
                            <span className='hidden sm:block font-medium'>{selectedItem.label}</span>
                            <IoCaretDownOutline className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        <div className={`absolute left-0 top-full mt-2 w-64 sm:w-72 transform transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                                <ul className='py-2'>
                                    {menuItems.map((item, i) => (
                                        <li
                                            key={i}
                                            onClick={() => handleMenuClick(item)}
                                            className='flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer group'
                                        >
                                            <span className={`${item.color} opacity-80 group-hover:opacity-100`}>
                                                {item.icon}
                                            </span>
                                            <span className='text-gray-700 group-hover:text-gray-900'>
                                                {item.label}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className='flex items-center gap-4'>
                        <button className='text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors duration-300 cursor-pointer'>
                            <TbWorld size={22} />
                        </button>
                        {/* <div className='hidden sm:flex gap-3'>
                            <Link
                                to="/login"
                                className='flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-lg'
                            >
                                Sign In
                            </Link>

                        </div> */}
                        <div className="flex items-center space-x-4 text-white/80 ">
                            {/* Add the admin icon button */}
                            <button
                                onClick={handleAdminLogin}
                                className="p-2 hover:bg-purple-600 rounded-full transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                                title="Admin Login"
                            >
                                <FaUserCog className="text-xl" />
                            </button>

                            {/* Your existing header buttons/icons */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;