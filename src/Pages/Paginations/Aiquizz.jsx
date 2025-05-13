import React, { useState } from 'react';
import { FaRobot, FaBrain, FaClock, FaStar, FaChartLine, FaTrophy } from 'react-icons/fa';
import { MdQuiz, MdSmartToy, MdLeaderboard } from 'react-icons/md';

const Aiquizz = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('all');

    const aiQuizzes = [
        {
            id: 1,
            title: "Adaptive Mathematics Quiz",
            description: "AI-powered quiz that adapts to your skill level",
            duration: "45 mins",
            difficulty: "Dynamic",
            participants: 2500,
            rating: 4.9,
            features: ["Real-time Adaptation", "Smart Feedback", "Performance Analytics"],
            topics: ["Algebra", "Calculus", "Statistics"],
            icon: <FaRobot className="text-cyan-500" />
        },
        {
            id: 2,
            title: "Machine Learning Fundamentals",
            description: "Test your ML knowledge with AI-guided questions",
            duration: "60 mins",
            difficulty: "Advanced",
            participants: 1800,
            rating: 4.8,
            features: ["Concept Mapping", "Visual Learning", "Instant Feedback"],
            topics: ["Neural Networks", "Deep Learning", "Data Science"],
            icon: <FaBrain className="text-cyan-500" />
        },
        {
            id: 3,
            title: "Python Programming Basics",
            description: "Interactive coding challenges with AI assistance",
            duration: "30 mins",
            difficulty: "Beginner",
            participants: 3200,
            rating: 4.7,
            features: ["Code Analysis", "Error Detection", "Solution Hints"],
            topics: ["Syntax", "Functions", "Data Types"],
            icon: <FaRobot className="text-cyan-500" />
        }
    ];

    // Pagination logic
    const itemsPerPage = 6;
    const totalPages = Math.ceil(aiQuizzes.length / itemsPerPage);

    // Filter quizzes based on search and difficulty
    const filteredQuizzes = aiQuizzes.filter(quiz => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            quiz.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesDifficulty = difficultyFilter === 'all' || quiz.difficulty.toLowerCase() === difficultyFilter;
        
        return matchesSearch && matchesDifficulty;
    });

    // Get current page items
    const paginatedQuizzes = filteredQuizzes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto mt-5">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-block p-4 bg-cyan-500/20 rounded-2xl mb-6">
                        <MdSmartToy className="w-16 h-16 text-cyan-400 animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        AI-Powered Smart Quizzes
                    </h1>
                    <p className="text-xl text-cyan-200/80">
                        Experience personalized learning with our adaptive AI quiz system
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {[
                        {
                            icon: <FaBrain />,
                            title: "Adaptive Learning",
                            description: "Questions adjust to your skill level"
                        },
                        {
                            icon: <FaChartLine />,
                            title: "Smart Analytics",
                            description: "Detailed performance insights"
                        },
                        {
                            icon: <MdLeaderboard />,
                            title: "Progress Tracking",
                            description: "Monitor your improvement"
                        }
                    ].map((feature, index) => (
                        <div key={index} 
                            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="p-3 bg-cyan-500/20 rounded-xl w-fit mb-4">
                                <span className="text-2xl text-cyan-400">{feature.icon}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-cyan-200/70">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Search and Filters */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/10">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search AI quizzes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-cyan-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setDifficultyFilter(level.toLowerCase())}
                                    className={`px-4 py-2 rounded-xl transition-all duration-300 
                                        ${difficultyFilter === level.toLowerCase()
                                            ? 'bg-cyan-500 text-white'
                                            : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'}`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Quiz Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {paginatedQuizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    {quiz.icon}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaStar className="text-cyan-400" />
                                    <span className="text-white">{quiz.rating}</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400">
                                {quiz.title}
                            </h3>
                            <p className="text-cyan-200/70 mb-4">
                                {quiz.description}
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-cyan-200/60">
                                    <span className="flex items-center gap-2">
                                        <FaClock />
                                        {quiz.duration}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FaTrophy />
                                        {quiz.participants} taken
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {quiz.topics.map((topic, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                Start AI Quiz
                            </button>
                        </div>
                    ))}
                </div>

                {/* Updated Pagination */}
                <div className="flex justify-center items-center gap-2">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 
                                    ${currentPage === page
                                        ? 'bg-cyan-500 text-white'
                                        : 'bg-white/5 text-white hover:bg-white/10'}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Aiquizz;