import React from 'react';
import { FaLinkedin, FaYoutube, FaTwitter, FaFacebook } from 'react-icons/fa';

const productLinks = [
    { name: 'Online Exams', path: '/online-exam' },
    { name: 'Paper Exams', path: '/paper-exams' },
    { name: 'Quizzes', path: '/quizzes' },
    { name: 'AI Quiz Generator', path: '/aiquizzes' },
    { name: 'AI Questions Generator', path: '/ai-questions' },
];

const socialLinks = [
    { icon: <FaLinkedin size={24} />, path: '/', label: 'LinkedIn' },
    { icon: <FaYoutube size={24} />, path: '/', label: 'YouTube' },
    { icon: <FaTwitter size={24} />, path: '/', label: 'Twitter' },
    { icon: <FaFacebook size={24} />, path: '/', label: 'Facebook' }
];

const Footer = () => {
    // Update footer styling
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-blue-900">
            <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <img src="/logo.png" alt="Logo" className="h-8 w-auto brightness-200" />
                            <span className="ml-3 text-xl font-bold text-white">Company</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Empowering educators with next-generation examination tools and solutions.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.path}
                                    aria-label={social.label}
                                    className="p-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Update section headings and links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Products</h3>
                        <ul className="space-y-4">
                            {productLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.path}
                                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Update newsletter section */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
                        <p className="text-gray-300 mb-4 text-sm">Subscribe to our newsletter for updates and tips.</p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            />
                            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} OpenExam. All rights reserved.
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

