import React from 'react';
import { TbBrandOpenai } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { TbWorld } from "react-icons/tb";
import company from "../assets/DigiAiquest_four.png"

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-6 py-4 fixed w-full top-0 z-50'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center backdrop-blur-lg bg-white/10 rounded-2xl p-2'>
                    {/* Logo Section */}
                    <div
                        className='flex items-center gap-2 cursor-pointer px-3'
                        onClick={() => navigate('/')}
                    >
                        {/* <TbBrandOpenai className="text-3xl text-blue-500" /> */}
                        <img src={company} alt='Logo' className=" text-blue-500 animate-pulse w-[30px]" />
                        <span className='text-white font-bold text-xl'>DigiAiquest</span>
                        <span className='bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full ml-2'>
                            Coming Soon
                        </span>
                    </div>

                    {/* Right Side Buttons */}
                    <div className='flex items-center gap-4 '>
                        <button className='text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors duration-300 cursor-pointer'>
                            <TbWorld size={22} />
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className='sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all duration-300'
                        >
                            Login
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;