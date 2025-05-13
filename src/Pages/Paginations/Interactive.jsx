import React, { useState } from 'react';
import { FaPlay, FaCode, FaLaptopCode, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { MdOndemandVideo, MdQuiz, MdLiveTv, MdGroups } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';

const Interactive = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const lessons = [
        {
            id: 1,
            title: "Live Coding Workshop",
            type: "live",
            instructor: "Dr. Sarah Chen",
            startTime: "10:00 AM",
            duration: "90 mins",
            participants: 45,
            level: "Intermediate",
            tags: ["Python", "Data Science", "Live Session"],
            description: "Interactive coding session with real-time feedback",
            thumbnail: "workshop-thumb.jpg",
            icon: <FaLaptopCode className="text-emerald-500" />
        },
        // Add more lessons...
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto mt-5">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-block p-4 bg-emerald-500/20 rounded-2xl mb-6">
                        <SiGoogleclassroom className="w-16 h-16 text-emerald-400 animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Interactive Learning Sessions
                    </h1>
                    <p className="text-xl text-emerald-200/80">
                        Join live classes, workshops, and interactive coding sessions
                    </p>
                </div>

                {/* Live Sessions Status */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/10">
                    <div className="flex flex-wrap gap-6 justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-white font-semibold">5 Sessions Live Now</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-emerald-200/80">
                                <MdGroups className="text-emerald-400" />
                                <span>250+ Learning</span>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-200/80">
                                <FaChalkboardTeacher className="text-emerald-400" />
                                <span>15 Expert Instructors</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {['All Sessions', 'Live Coding', 'Workshops', 'Group Study', 'Q&A Sessions'].map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category.toLowerCase())}
                            className={`px-6 py-3 rounded-xl transition-all duration-300 
                                ${activeCategory === category.toLowerCase()
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-white/5 text-emerald-400 hover:bg-white/10'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search for sessions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                {/* Session Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="relative">
                                <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/90 text-white text-sm rounded-full">
                                    Live Now
                                </div>
                                <div className="h-48 bg-emerald-900/50"></div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                        {lesson.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400">
                                            {lesson.title}
                                        </h3>
                                        <p className="text-emerald-200/60">{lesson.instructor}</p>
                                    </div>
                                </div>

                                <p className="text-emerald-200/70 mb-4">
                                    {lesson.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-2 text-emerald-200/60">
                                        <MdLiveTv />
                                        <span>{lesson.startTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-emerald-200/60">
                                        <FaUserGraduate />
                                        <span>{lesson.participants} joined</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {lesson.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                    Join Session
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2">
                    <button className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300">
                        Previous
                    </button>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 
                                    ${currentPage === page
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-white/5 text-white hover:bg-white/10'}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Interactive;