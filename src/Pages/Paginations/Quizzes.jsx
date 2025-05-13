import React, { useState } from 'react';
import { FaBookOpen, FaClock, FaStar, FaUsers, FaChartLine, FaMedal } from 'react-icons/fa';
import { MdQuiz, MdCategory, MdTimer } from 'react-icons/md';

const Quizzes = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const quizzes = [
        {
            id: 1,
            title: "JavaScript Fundamentals",
            category: "Programming",
            description: "Test your JavaScript knowledge",
            duration: "30 mins",
            questions: 25,
            difficulty: "Intermediate",
            participants: 1500,
            rating: 4.7,
            tags: ["ES6", "Functions", "Objects"],
            icon: <MdQuiz className="text-yellow-500" />
        },
        // Add more quizzes...
    ];

    const categories = [
        { id: 'programming', name: 'Programming', color: 'yellow' },
        { id: 'mathematics', name: 'Mathematics', color: 'blue' },
        { id: 'science', name: 'Science', color: 'green' },
        { id: 'language', name: 'Language', color: 'purple' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-900 pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto mt-5">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-block p-4 bg-yellow-500/20 rounded-2xl mb-6">
                        <MdQuiz className="w-16 h-16 text-yellow-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Challenge Yourself
                    </h1>
                    <p className="text-xl text-yellow-200/80">
                        Explore our collection of interactive quizzes
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: <FaUsers />, label: "Active Users", value: "5,000+" },
                        { icon: <MdQuiz />, label: "Total Quizzes", value: "500+" },
                        { icon: <FaChartLine />, label: "Completion Rate", value: "85%" },
                        { icon: <FaMedal />, label: "Top Scorers", value: "1,000+" }
                    ].map((stat, index) => (
                        <div key={index} 
                            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-400">
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                    <p className="text-yellow-200/80">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Category Filters */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/10">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search quizzes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-yellow-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-xl transition-all duration-300 
                                        ${selectedCategory === category.id 
                                            ? `bg-${category.color}-500 text-white` 
                                            : `bg-${category.color}-500/10 text-${category.color}-400 hover:bg-${category.color}-500/20`
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quiz Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {quizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-yellow-500/10 rounded-xl">
                                    {quiz.icon}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaStar className="text-yellow-400" />
                                    <span className="text-white">{quiz.rating}</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400">
                                {quiz.title}
                            </h3>
                            <p className="text-yellow-200/70 mb-4">
                                {quiz.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-yellow-200/60">
                                    <MdTimer />
                                    <span>{quiz.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-yellow-200/60">
                                    <MdQuiz />
                                    <span>{quiz.questions} Questions</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {quiz.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <button className="w-full mt-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                Start Quiz
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
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 
                                    ${currentPage === page 
                                        ? 'bg-yellow-500 text-white' 
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

export default Quizzes;