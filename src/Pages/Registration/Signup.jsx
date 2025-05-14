import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .required('Full name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            // Store user data in localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(values);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Redirect to login
            navigate('/login');
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                    <p className="mt-2 text-blue-200/80">Join us to explore AI-powered learning</p>
                </div>

                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <div>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
                            <input
                                {...formik.getFieldProps('fullName')}
                                placeholder="Full Name"
                                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {formik.touched.fullName && formik.errors.fullName && (
                            <p className="mt-1 text-red-400 text-sm">{formik.errors.fullName}</p>
                        )}
                    </div>

                    <div>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
                            <input
                                {...formik.getFieldProps('email')}
                                type="email"
                                placeholder="Email address"
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
                                {...formik.getFieldProps('password')}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
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

                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-blue-200/80">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-400 hover:text-blue-300">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
