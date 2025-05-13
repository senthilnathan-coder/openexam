import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserGraduate, FaEye, FaEyeSlash, FaChalkboardTeacher } from 'react-icons/fa';
import { MdSchool, MdQuiz, MdLeaderboard } from 'react-icons/md';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'student',
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .required('Full name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[^\w]/, 'Password must contain at least one symbol')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
            role: Yup.string().required('Role is required'),
        }),
        onSubmit: (values) => {
            console.log(values);
            // Handle signup logic here
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-900 py-8 px-4 sm:px-6 lg:px-8 mt-10">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
                {/* Left Side - Welcome Content */}
                <div className="hidden md:flex flex-col justify-center space-y-8 p-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-500/20 rounded-2xl">
                            <MdSchool className="w-14 h-14 text-blue-400" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Company
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-5xl font-bold text-white leading-tight">
                            Empower Your <span className="text-blue-400">Learning</span> Journey
                        </h2>
                        <p className="text-xl text-blue-100/80 leading-relaxed">
                            Join thousands of students and educators in our innovative learning platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-6">
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4">
                                <MdQuiz className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Smart Assessments</h3>
                            <p className="text-blue-100/70">AI-powered practice tests tailored to your level</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
                                <MdLeaderboard className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Track Progress</h3>
                            <p className="text-blue-100/70">Monitor your performance with detailed analytics</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Sign Up Form */}
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10">
                    <div className="flex flex-col items-center mb-8">
                        <h2 className="text-3xl font-bold text-white">Get Started</h2>
                        <p className="mt-3 text-lg text-blue-200/80">Create your account today</p>
                    </div>

                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <div className="relative group">
                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/60 group-hover:text-blue-400 transition-colors duration-200" />
                                    <input
                                        id="fullName"
                                        {...formik.getFieldProps('fullName')}
                                        className="w-full px-12 py-4 bg-white/5 border border-white/10 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-blue-200/50 hover:bg-white/10 transition-all duration-200"
                                        placeholder="Full Name"
                                    />
                                </div>
                                {formik.touched.fullName && formik.errors.fullName && (
                                    <p className="mt-2 text-sm text-red-400 pl-4">{formik.errors.fullName}</p>
                                )}
                            </div>

                            <div>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email address"
                                        {...formik.getFieldProps('email')}
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {formik.touched.email && formik.errors.email && (
                                    <p className="mt-1 text-red-400 text-sm">{formik.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        {...formik.getFieldProps('password')}
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/60 hover:text-blue-200"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <p className="mt-1 text-red-400 text-sm">{formik.errors.password}</p>
                                )}
                            </div>

                            <div>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        {...formik.getFieldProps('confirmPassword')}
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <p className="mt-1 text-red-400 text-sm">{formik.errors.confirmPassword}</p>
                                )}
                            </div>

                            <div>
                                <div className="relative">
                                    <FaUserGraduate className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
                                    <select
                                        id="role"
                                        name="role"
                                        {...formik.getFieldProps('role')}
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="student" className="bg-blue-900">Student</option>
                                        <option value="teacher" className="bg-blue-900">Teacher</option>
                                    </select>
                                </div>
                                {formik.touched.role && formik.errors.role && (
                                    <p className="mt-1 text-red-400 text-sm">{formik.errors.role}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-lg font-semibold rounded-2xl hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-900 transition-all duration-300"
                            >
                                Create Account
                            </button>

                            <div className="text-center mt-6">
                                <p className="text-blue-200/80">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
