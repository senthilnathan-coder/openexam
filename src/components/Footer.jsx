import React from 'react';
import { FaLinkedin, FaYoutube, FaTwitter, FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.png';

const productLinks = [
    { name: 'Online Exams', path: '/online-exam' },
    { name: 'Paper Exams', path: '/paper-exams' },
    { name: 'Quizzes', path: '/quizzes' },
    { name: 'AI Quiz Generator', path: '/ai-questions' },
];

const quickLinks = [
    { name: 'About Us' },
    { name: 'Contact' },
    { name: 'Privacy Policy'},
    { name: 'Terms of Service' },
];

// Update the socialLinks array
const socialLinks = [
    { icon: <FaLinkedin size={24} />, path: '/', label: 'LinkedIn', color: 'hover:bg-blue-600 hover:scale-110' },
    { icon: <FaYoutube size={24} />, path: '/', label: 'YouTube', color: 'hover:bg-red-600 hover:scale-110' },
    { icon: <FaTwitter size={24} />, path: '/', label: 'Twitter', color: 'hover:bg-blue-400 hover:scale-110' },
    { icon: <FaFacebook size={24} />, path: '/', label: 'Facebook', color: 'hover:bg-blue-800 hover:scale-110' }
];

// Update the newsletter section
<div className="space-y-6">
    <h3 className="text-xl font-bold text-white mb-6">Newsletter</h3>
    <p className="text-gray-300 text-sm leading-relaxed">
        Subscribe to our newsletter and stay updated with the latest news and updates.
    </p>
    <div className="space-y-3">
        <div className="relative group">
            <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300 group-hover:border-blue-500"
            />
            <button className="absolute right-2 top-2 bg-blue-500 text-white px-6 py-1.5 rounded-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 font-medium">
                Subscribe
            </button>
        </div>
    </div>
</div>

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <img src={logo} alt="Logo" className="h-10 w-auto" />
                            <h3 className="text-2xl font-bold text-white">AI Quiz</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Empowering educators with next-generation examination tools and AI-powered solutions.
                        </p>
                        <div className="space-y-4 text-gray-300 text-sm">
                            <div className="flex items-center space-x-3">
                                <FaMapMarkerAlt className="text-blue-400" />
                                <span>Karaikudi, Tamil Nadu, India</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaPhone className="text-blue-400" />
                                <span>+91 123-456-7890</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="text-blue-400" />
                                <span>contact@aiquiz.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Products</h3>
                        <ul className="space-y-4">
                            {productLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.path}
                                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2"
                                    >
                                        <span className="h-1 w-1 bg-blue-400 rounded-full"></span>
                                        <span>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4 list-none">
                            {quickLinks.map((item, index) => (
                                <li key={index} className="text-gray-300 flex items-center space-x-2">
                                    <span className="h-1 w-1 bg-blue-400 rounded-full"></span>
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white mb-6">Newsletter</h3>
                        <p className="text-gray-300 text-sm">
                            Subscribe to our newsletter and stay updated with the latest news and updates.
                        </p>
                        <div className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                                />
                                <button className="absolute right-2 top-2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        {/* Social Links */}
                        <div className="flex space-x-4 pt-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.path}
                                    aria-label={social.label}
                                    className={`p-2 bg-gray-800 rounded-full text-gray-300 ${social.color} transition-all duration-300 hover:text-white transform hover:scale-110`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Digitaly at SunglassChettinad private Limited, Karaikudi.
                        </p>
                        <div className="flex items-center space-x-6">
                            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

