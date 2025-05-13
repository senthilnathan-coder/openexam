import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login, setUserProfile } = useAuth();

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
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (response.ok) {
                    // Update user profile in context and localStorage
                    const userProfile = {
                        email: values.email,
                        name: data.name || 'User',
                        role: data.role || 'user'
                    };

                    await login(values.email, values.password);
                    setUserProfile(userProfile);
                    localStorage.setItem('userProfile', JSON.stringify(userProfile));

                    toast.success('Login successful!');

                    // Navigate based on the last attempted path or default to home
                    const lastAttemptedPath = localStorage.getItem('lastAttemptedPath') || '/home';
                    localStorage.removeItem('lastAttemptedPath');
                    navigate(lastAttemptedPath);
                } else {
                    toast.error(data.message || 'Login failed');
                }
            } catch (error) {
                console.error('Login error:', error);
                toast.error('An error occurred during login');
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-white">Welcome Back</h2>
                    <p className="mt-2 text-center text-sm text-blue-200/80">
                        Sign in to your exam account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    {...formik.getFieldProps('email')}
                                    className="appearance-none relative block w-full px-10 py-3 bg-white/10 border border-white/20 placeholder-blue-200/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <p className="mt-1 text-sm text-red-400">{formik.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    {...formik.getFieldProps('password')}
                                    className="appearance-none relative block w-full px-10 py-3 bg-white/10 border border-white/20 placeholder-blue-200/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                    placeholder="Password"
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
                                <p className="mt-1 text-sm text-red-400">{formik.errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-200/80">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-blue-200/80">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300">
                                Sign up
                            </Link>
                        </p>

                    </div>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const decoded = jwtDecode(credentialResponse.credential);
                            console.log(decoded);
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;