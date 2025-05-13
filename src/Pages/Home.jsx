import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoTimer } from 'react-icons/io5';
import { BiSolidFileDoc } from 'react-icons/bi';
import { MdQuiz, MdAssignment, MdSchool } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import { TbBrandOpenai } from 'react-icons/tb';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import Scrolling from './Scrolling';
import Section_two from './Section_two';
import Section_three from './Section_three';
import { SiGoogleforms } from 'react-icons/si';

const tools = [
    { icon: <TbBrandOpenai size={20} />, label: "Home", color: "bg-blue-500/20 text-blue-400", path: "/home" },
    { icon: <SiGoogleforms size={20} />, label: "Online Exam", color: "bg-red-500/20 text-red-400", path: "/online-exam" },
    { icon: <MdQuiz size={20} />, label: "Quizzes", color: "bg-orange-500/20 text-orange-400", path: "/quizzes" },
    { icon: <MdAssignment size={20} />, label: "Paper Exams", color: "bg-purple-500/20 text-purple-400", path: "/paper-exams" },
    { icon: <MdAssignment size={20} />, label: "Code Assignment", color: "bg-blue-500/20 text-blue-400", path: "/code-assignment" },
    { icon: <MdAssignment size={20} />, label: "Paper Assignment", color: "bg-pink-500/20 text-pink-400", path: "/paper-assignment" },
    { icon: <MdSchool size={20} />, label: "Interactive Lessons", color: "bg-green-500/20 text-green-400", path: "/lessons" },
    { icon: <TbBrandOpenai size={20} />, label: "AI Questions", color: "bg-indigo-500/20 text-indigo-400", path: "/ai-questions" },
    { icon: <MdQuiz size={20} />, label: "AI Quiz", color: "bg-yellow-500/20 text-yellow-400", path: "/aiquizzes" },
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 mt-4">
            {/* Hero Section */}
            <div className="px-4 py-20 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                        Exams of today, with<br />
                        tools from the future
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Transform your learning experience with our modern exam platform. 
                        Simple, powerful, and designed for you.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3 sm:gap-4 mb-16 px-4 sm:px-0 max-w-lg mx-auto">
                    <button 
                        onClick={() => navigate('/signup')}
                        className="flex-1 group relative px-6 sm:px-8 py-3.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                        <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base font-medium">
                            <BsCheckCircleFill className="text-lg" />
                            Get Started Now
                        </span>
                    </button>
                    <button 
                        onClick={() => navigate('/features')}
                        className="flex-1 group relative px-6 sm:px-8 py-3.5 bg-white/5 backdrop-blur-sm text-white rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                        <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base font-medium">
                            <AiOutlineQuestionCircle className="text-lg" />
                            Learn More
                        </span>
                    </button>
                </div>

            
              
            </div>

            {/* Tools Circle Layout */}
            <div className="relative max-w-3xl mx-auto px-4 mb-16">
                <div className="flex  justify-center items-center gap-4">
                    {tools.map((tool, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(tool.path)}
                            className="flex flex-col items-center w-24 sm:w-28 group"
                        >
                            <div className={`${tool.color} w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg`}>
                                <div className="text-2xl sm:text-3xl">
                                    {tool.icon}
                                </div>
                            </div>
                            {/* <span className="mt-2 text-center text-white text-sm font-medium">
                                {tool.label}
                            </span> */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Keep existing sections with simplified styling */}
            <div className="bg-gray-800">
                <Scrolling />
                <Section_two />
                <Section_three />
            </div>
        </div>
    );
};

export default Home;