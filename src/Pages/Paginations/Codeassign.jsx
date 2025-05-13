import React, { useState } from 'react';
import { FaCode, FaGithub, FaCodeBranch, FaTerminal, FaCheck } from 'react-icons/fa';
import { BiGitPullRequest, BiCodeBlock } from 'react-icons/bi';
import { MdAssignment, MdTimer, MdLanguage } from 'react-icons/md';

const Codeassign = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [languageFilter, setLanguageFilter] = useState('all');

    const codeAssignments = [
        {
            id: 1,
            title: "Build a REST API",
            language: "Node.js",
            difficulty: "Intermediate",
            deadline: "2024-02-25",
            duration: "5 days",
            points: 100,
            status: "open",
            requirements: ["Express.js", "MongoDB", "JWT Auth"],
            description: "Create a RESTful API with user authentication and CRUD operations",
            testCases: 15,
            submissions: 45,
            icon: <FaCode className="text-blue-500" />
        },
        // Add more assignments...
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto mt-5">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-block p-4 bg-blue-500/20 rounded-2xl mb-6">
                        <BiCodeBlock className="w-16 h-16 text-blue-400 animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Code Assignments
                    </h1>
                    <p className="text-xl text-blue-200/80">
                        Practice real-world coding challenges with automated testing
                    </p>
                </div>

                {/* Assignment Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: <FaGithub />, label: "Git Repositories", value: "25+" },
                        { icon: <FaCodeBranch />, label: "Code Submissions", value: "1.2K" },
                        { icon: <BiGitPullRequest />, label: "Pull Requests", value: "850" },
                        { icon: <FaCheck />, label: "Completed", value: "650" }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                    <p className="text-blue-200/80">{stat.label}</p>
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
                                placeholder="Search assignments..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            {['Python', 'JavaScript', 'Java', 'C++'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguageFilter(lang.toLowerCase())}
                                    className={`px-4 py-2 rounded-xl transition-all duration-300 
                                        ${languageFilter === lang.toLowerCase()
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'}`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Assignment Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {codeAssignments.map((assignment) => (
                        <div
                            key={assignment.id}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-500/10 rounded-xl">
                                        {assignment.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400">
                                            {assignment.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-blue-200/60 mt-1">
                                            <MdLanguage />
                                            <span>{assignment.language}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                                    {assignment.status}
                                </span>
                            </div>

                            <p className="text-blue-200/70 mb-4">
                                {assignment.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-blue-200/60">
                                    <MdTimer />
                                    <span>Due: {assignment.deadline}</span>
                                </div>
                                <div className="flex items-center gap-2 text-blue-200/60">
                                    <FaTerminal />
                                    <span>{assignment.testCases} Test Cases</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {assignment.requirements.map((req, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                                    >
                                        {req}
                                    </span>
                                ))}
                            </div>

                            <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                Start Coding
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
                                        ? 'bg-blue-500 text-white'
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

export default Codeassign;