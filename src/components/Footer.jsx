import React from 'react';
import { FaLinkedin, FaYoutube, FaTwitter, FaFacebook, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { TbBrandOpenai } from "react-icons/tb";
import company from "../assets/DigiAiquest_four.png"

const socialLinks = [
    { icon: <FaLinkedin size={20} />, path: '/', label: 'LinkedIn' },
    { icon: <FaYoutube size={20} />, path: '/', label: 'YouTube' },
    { icon: <FaTwitter size={20} />, path: '/', label: 'Twitter' },
    { icon: <FaFacebook size={20} />, path: '/', label: 'Facebook' }
];

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                        <img src={company} alt='Logo' className=" text-blue-500 animate-pulse w-[50px]" />
                            <span className="ml-3 text-2xl font-bold text-white">DigiAiquest</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The next generation of AI-powered examination platform.
                            Revolutionizing the way we learn and assess.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.path}
                                    aria-label={social.label}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-blue-400 transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-white text-xl font-semibold">Contact Us</h3>
                        <div className="space-y-4">
                            <a href="mailto:info@digiquestai.com" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors duration-300">
                                <FaEnvelope className="text-blue-500" />
                                <span>info@digiquestai.com</span>
                            </a>
                            <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors duration-300">
                                <FaPhoneAlt className="text-blue-500" />
                                <span>+1 (234) 567-890</span>
                            </a>
                            <div className="flex items-center gap-3 text-gray-400">
                                <FaMapMarkerAlt className="text-blue-500" />
                                <span>123 AI Street, Digital City, 12345</span>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-6">
                        <h3 className="text-white text-xl font-semibold">Stay Updated</h3>
                        <p className="text-gray-400 text-sm">
                            Subscribe to get notified when we launch and receive future updates.
                        </p>
                        <div className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                                />
                            </div>
                            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                                Join Waitlist
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} DigiquestAi. All rights reserved.
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

