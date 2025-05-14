import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === values.email && u.password === values.password);

            if (user) {
                // Store logged-in user
                localStorage.setItem('currentUser', JSON.stringify(user));
                // Redirect to AI Questions Generator
                navigate('/ai-questions');
            } else {
                alert('Invalid credentials');
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                    <p className="mt-2 text-blue-200/80">Sign in to continue</p>
                </div>

                <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
                        Sign In
                    </button>

                    <p className="text-center text-blue-200/80">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-400 hover:text-blue-300">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;