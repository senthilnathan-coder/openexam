import React, { useState } from 'react';
import { FaFileAlt, FaCalendarAlt, FaClock, FaUserGraduate, FaDownload, FaUpload } from 'react-icons/fa';
import { MdAssignment, MdSubject, MdGrade } from 'react-icons/md';

const Paperassign = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const assignments = [
        {
            id: 1,
            title: "Advanced Mathematics Problem Set",
            subject: "Mathematics",
            dueDate: "2024-02-20",
            duration: "2 hours",
            status: "pending",
            totalMarks: 100,
            description: "Solve complex mathematical problems including calculus and algebra",
            requirements: ["Show all working", "Clear handwriting", "Step-by-step solutions"],
            fileFormat: "PDF",
            icon: <FaFileAlt className="text-purple-500" />
        },
        // Add more assignments...
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-purple-900 pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto mt-5">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-block p-4 bg-purple-500/20 rounded-2xl mb-6">
                        <MdAssignment className="w-16 h-16 text-purple-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Paper Assignments
                    </h1>
                    <p className="text-xl text-purple-200/80">
                        Manage and submit your written assignments
                    </p>
                </div>

                {/* Assignment Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: <MdAssignment />, label: "Total Assignments", value: "15" },
                        { icon: <FaUpload />, label: "Submitted", value: "8" },
                        { icon: <FaClock />, label: "Pending", value: "7" },
                        { icon: <MdGrade />, label: "Average Score", value: "85%" }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                    <p className="text-purple-200/80">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters and Search */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/10">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search assignments..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            {['All', 'Pending', 'Submitted', 'Graded'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status.toLowerCase())}
                                    className={`px-4 py-2 rounded-xl transition-all duration-300 
                                        ${filterStatus === status.toLowerCase()
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Assignment Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {assignments.map((assignment) => (
                        <div
                            key={assignment.id}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-500/10 rounded-xl">
                                        {assignment.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            {assignment.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-purple-200/60">
                                            <span className="flex items-center gap-1">
                                                <MdSubject />
                                                {assignment.subject}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaClock />
                                                {assignment.duration}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm 
                                    ${assignment.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                                    assignment.status === 'submitted' ? 'bg-green-500/10 text-green-400' :
                                    'bg-blue-500/10 text-blue-400'}`}>
                                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                                </span>
                            </div>

                            <p className="text-purple-200/70 mb-4">
                                {assignment.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-2 text-purple-200/60">
                                    <FaCalendarAlt />
                                    <span>Due: {assignment.dueDate}</span>
                                </div>
                                <div className="flex items-center gap-2 text-purple-200/60">
                                    <MdGrade />
                                    <span>Marks: {assignment.totalMarks}</span>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button className="flex-1 py-3 bg-purple-500/10 text-purple-400 rounded-xl hover:bg-purple-500/20 transition-all duration-300">
                                    <FaDownload className="inline mr-2" />
                                    Download
                                </button>
                                <button className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
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
                                        ? 'bg-purple-500 text-white'
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

export default Paperassign;