import React, { useState } from 'react';
import { FaFileAlt, FaDownload, FaUpload, FaClock, FaBook, FaUserGraduate } from 'react-icons/fa';
import { MdAssignment, MdTimer, MdSubject, MdGrade } from 'react-icons/md';

const Paper = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('all');

    const paperExams = [
        {
            id: 1,
            title: "Advanced Mathematics Final",
            subject: "Mathematics",
            date: "2024-03-15",
            time: "09:00 AM",
            duration: "3 hours",
            totalMarks: 100,
            instructions: ["No calculators allowed", "Answer all sections", "Show all working"],
            examType: "Final",
            status: "upcoming",
            icon: <FaFileAlt className="text-violet-500" />
        },
        // Add more exams...
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-900 to-gray-900 pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto mt-5">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-block p-4 bg-violet-500/20 rounded-2xl mb-6">
                        <MdAssignment className="w-16 h-16 text-violet-400 animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Paper-Based Examinations
                    </h1>
                    <p className="text-xl text-violet-200/80">
                        Access and manage your traditional written examinations
                    </p>
                </div>

                {/* Exam Overview Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: <FaBook />, label: "Total Exams", value: "12" },
                        { icon: <FaClock />, label: "Upcoming", value: "5" },
                        { icon: <FaUserGraduate />, label: "Completed", value: "7" },
                        { icon: <MdGrade />, label: "Average Score", value: "85%" }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-violet-500/20 rounded-xl text-violet-400">
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                    <p className="text-violet-200/80">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search and Filters */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/10">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search exams..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-violet-200/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            {['Mathematics', 'Physics', 'Chemistry', 'Biology'].map((subject) => (
                                <button
                                    key={subject}
                                    onClick={() => setSubjectFilter(subject.toLowerCase())}
                                    className={`px-4 py-2 rounded-xl transition-all duration-300 
                                        ${subjectFilter === subject.toLowerCase()
                                            ? 'bg-violet-500 text-white'
                                            : 'bg-violet-500/10 text-violet-400 hover:bg-violet-500/20'}`}
                                >
                                    {subject}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Exam Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {paperExams.map((exam) => (
                        <div
                            key={exam.id}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-violet-500/10 rounded-xl">
                                        {exam.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white group-hover:text-violet-400">
                                            {exam.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-violet-200/60 mt-1">
                                            <MdSubject />
                                            <span>{exam.subject}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm 
                                    ${exam.status === 'upcoming' ? 'bg-yellow-500/10 text-yellow-400' : 
                                    exam.status === 'completed' ? 'bg-green-500/10 text-green-400' : 
                                    'bg-red-500/10 text-red-400'}`}>
                                    {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-violet-200/60">
                                    <MdTimer />
                                    <span>{exam.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-violet-200/60">
                                    <FaClock />
                                    <span>{exam.time}</span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                {exam.instructions.map((instruction, index) => (
                                    <div key={index} className="flex items-center gap-2 text-violet-200/70">
                                        <div className="w-1.5 h-1.5 bg-violet-400 rounded-full"></div>
                                        <span>{instruction}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 py-3 px-4 bg-violet-500/10 text-violet-400 rounded-xl hover:bg-violet-500/20 transition-all duration-300">
                                    <FaDownload className="inline mr-2" />
                                    Download
                                </button>
                                <button className="flex-1 py-3 px-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                    <FaUpload className="inline mr-2" />
                                    Submit
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
                                        ? 'bg-violet-500 text-white'
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

export default Paper;