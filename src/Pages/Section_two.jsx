import React from 'react';
import { SiGoogleforms } from 'react-icons/si';
import { MdQuiz, MdAssignment, MdSchool } from 'react-icons/md';
import { TbBrandOpenai, TbPlayerPlay } from 'react-icons/tb';

const cards = [
    {
        icon: <SiGoogleforms className="text-4xl text-red-500" />,
        title: "Online Exams",
        description: "Conduct secure exams with rich questions and advanced proctoring.",
        link: "Learn More",
        bgColor: "bg-red-50",
        hoverColor: "hover:bg-red-100",
        path: "/online-exam"
    },
    {
        icon: <MdQuiz className="text-4xl text-orange-500" />,
        title: "Quizzes",
        description: "Keep your students' skills sharp at all times.",
        link: "Learn More",
        bgColor: "bg-orange-50",
        hoverColor: "hover:bg-orange-100",
        path: "/quizzes"
    },
    {
        icon: <MdAssignment className="text-4xl text-purple-500" />,
        title: "Paper Exams",
        description: "Everything you need to design, print, grade, and generate reports for your paper exams.",
        link: "Learn More",
        bgColor: "bg-purple-50",
        hoverColor: "hover:bg-purple-100",
        path: "/paper-exams"
    },
    {
        icon: <MdAssignment className="text-4xl text-blue-500" />,
        title: "Code Assignment",
        description: "Learn More",
        link: "",
        bgColor: "bg-blue-50",
        hoverColor: "hover:bg-blue-100",
        path: "/code-assignment"
    },
    {
        icon: <MdAssignment className="text-4xl text-pink-500" />,
        title: "Paper Assignment",
        description: "Coming soon",
        link: "",
        bgColor: "bg-pink-50",
        hoverColor: "hover:bg-pink-100",
        path: "/paper-assignment"
    },
    {
        icon: <TbPlayerPlay className="text-4xl text-emerald-500" />,
        title: "Interactive Lessons",
        description: "Coming soon",
        link: "",
        bgColor: "bg-emerald-50",
        hoverColor: "hover:bg-emerald-100",
        path: "/lessons"
    },
    {
        icon: <TbBrandOpenai className="text-4xl text-indigo-500" />,
        title: "AI Questions Generator",
        description: "Generate high-quality questions automatically using advanced AI technology.",
        link: "Learn More",
        bgColor: "bg-indigo-50",
        hoverColor: "hover:bg-indigo-100",
        path: "/ai-questions"
    },
    {
        icon: <MdQuiz className="text-4xl text-violet-500" />,
        title: "AI Quiz Generator",
        description: "Create engaging quizzes instantly with our AI-powered quiz generation system.",
        link: "Learn More",
        bgColor: "bg-violet-50",
        hoverColor: "hover:bg-violet-100",
        path: "/aiquizzes"
    },
    {
        icon: <MdSchool className="text-4xl text-teal-500" />,
        title: "Learning Analytics",
        description: "Get detailed insights into student performance and learning patterns.",
        link: "Learn More",
        bgColor: "bg-teal-50",
        hoverColor: "hover:bg-teal-100",
        path: "/"
    },
];

const Section_two = () => {
    return (
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                        Our Solutions
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Comprehensive tools designed to make education more efficient and effective
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`group relative overflow-hidden rounded-2xl p-8 ${card.bgColor} 
                                        border border-gray-200 shadow-md hover:shadow-xl transition-all duration-500 ease-out`}
                        >
                            {/* Decorative Glow on Hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/60 to-transparent transition-opacity duration-700 pointer-events-none"></div>

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                                    {card.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{card.title}</h3>

                                {/* Description */}
                                <p className="text-gray-600 mb-5 leading-relaxed">{card.description}</p>

                                {/* Link */}
                                {card.link && (
                                    <a
                                        href={card.path}
                                        className="inline-flex items-center text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors"
                                    >
                                        {card.link}
                                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                )}

                                {/* Coming Soon Badge */}
                                {!card.link && (
                                    <span className="absolute top-4 right-4 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
                                        Coming Soon
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Section_two;
