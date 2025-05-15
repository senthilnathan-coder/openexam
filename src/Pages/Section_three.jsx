import React from 'react';
import { FaGlobe, FaUsers, FaBuilding } from 'react-icons/fa';

const stats = [
    {
        icon: <FaGlobe className="text-3xl text-emerald-500" />,
        number: "85+",
        title: "Used in more than",
        subtitle: "countries"
    },
    {
        icon: <FaUsers className="text-3xl text-emerald-500" />,
        number: "50+",
        title: "More than",
        subtitle: "New Teacher Joining Everyday"
    },
    {
        icon: <FaBuilding className="text-3xl text-emerald-500" />,
        number: "1000+",
        title: "Used in more than",
        subtitle: "Institutes"
    }
];

const Section_three = () => {
    return (
      <>
        <div className="bg-gradient-to-b from-white to-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4">
                {/* Main Title */}
                {/* <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                        Join the global community of educators
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium omnis nam, praesentium dolore est culpa possimus quia beatae.
                    </p>
                </div> */}

                {/* Stats Section */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {stats.map((stat, index) => (
                        <div 
                            key={index} 
                            <div className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="p-4 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-300">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-4xl font-bold text-gray-800 group-hover:text-emerald-500 transition-colors duration-300">
                                        {stat.number}
                                    </h3>
                                    <div className="space-y-1">
                                        <p className="text-gray-600 font-medium">{stat.title}</p>
                                        <p className="text-gray-500">{stat.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                    ))}
                </div> */}

                {/* Newsletter Section */}
                {/* <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-emerald-50 opacity-5"></div>
                    <div className="relative bg-white backdrop-blur-xl rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 ">
                        <div className="flex items-center gap-6 flex-1">
                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                                <p className="text-gray-600">Get the latest updates on new features and educational resources.</p>
                            </div>
                        </div>
                        <div className="flex w-full md:w-auto gap-3">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 md:w-80 px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                            />
                            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
      </>
    );
};

export default Section_three;