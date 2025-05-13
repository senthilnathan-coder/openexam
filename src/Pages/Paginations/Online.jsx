import React, { useState } from 'react';
import { FaLaptop, FaClock, FaUserGraduate, FaVideo, FaLock, FaDesktop } from 'react-icons/fa';
import { MdOnlinePrediction, MdTimer, MdSubject, MdGrade } from 'react-icons/md';
import { BiWebcam, BiMicrophone } from 'react-icons/bi';

const Online = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [examFilter, setExamFilter] = useState('all');

    const onlineExams = [
        {
            id: 1,
            title: "Computer Science Fundamentals",
            subject: "Computer Science",
            date: "2024-02-28",
            time: "10:00 AM",
            duration: "2 hours",
            totalMarks: 100,
            proctoring: true,
            requirements: ["Webcam", "Microphone", "Stable Internet"],
            status: "scheduled",
            participants: 150,
            icon: <FaLaptop className="text-teal-500" />
        },
        // Add more exams...
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto mt-5">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-block p-4 bg-teal-500/20 rounded-2xl mb-6">
                        <MdOnlinePrediction className="w-16 h-16 text-teal-400 animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Online Examinations
                    </h1>
                    <p className="text-xl text-teal-200/80">
                        Secure and proctored online testing environment
                    </p>
                </div>

                {/* System Check Banner */}
                <div className="bg-teal-500/10 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-teal-500/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-teal-500/20 rounded-xl">
                                <FaDesktop className="text-2xl text-teal-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">System Requirements Check</h3>
                                <p className="text-teal-200/70">Ensure your device meets all requirements</p>
                            </div>
                        </div>
                        <button className="px-6 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all duration-300">
                            Run Check
                        </button>
                    </div>
                </div>

                {/* Exam Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: <FaLaptop />, label: "Available Exams", value: "15" },
                        { icon: <FaClock />, label: "Upcoming", value: "8" },
                        { icon: <FaUserGraduate />, label: "Completed", value: "7" },
                        { icon: <FaLock />, label: "Proctored", value: "12" }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-teal-500/20 rounded-xl text-teal-400">
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                    <p className="text-teal-200/80">{stat.label}</p>
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
                                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-teal-200/50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            {['All', 'Proctored', 'Non-Proctored', 'Practice'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setExamFilter(type.toLowerCase())}
                                    className={`px-4 py-2 rounded-xl transition-all duration-300 
                                        ${examFilter === type.toLowerCase()
                                            ? 'bg-teal-500 text-white'
                                            : 'bg-teal-500/10 text-teal-400 hover:bg-teal-500/20'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Exam Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {onlineExams.map((exam) => (
                        <div
                            key={exam.id}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-teal-500/10 rounded-xl">
                                        {exam.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white group-hover:text-teal-400">
                                            {exam.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-teal-200/60 mt-1">
                                            <MdSubject />
                                            <span>{exam.subject}</span>
                                        </div>
                                    </div>
                                </div>
                                {exam.proctoring && (
                                    <span className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-sm flex items-center gap-2">
                                        <FaLock size={12} />
                                        Proctored
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-teal-200/60">
                                    <MdTimer />
                                    <span>{exam.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-teal-200/60">
                                    <FaClock />
                                    <span>{exam.time}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-6">
                                {exam.requirements.map((req, index) => (
                                    <div key={index} className="flex items-center gap-2 text-teal-200/70">
                                        {req.includes('Webcam') ? <BiWebcam /> :
                                         req.includes('Microphone') ? <BiMicrophone /> :
                                         <FaVideo />}
                                        <span>{req}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                Enter Exam
                            </button>
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
                                        ? 'bg-teal-500 text-white'
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

export default Online;