import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required')
                .trim()
                .lowercase(),
            password: Yup.string()
                .required('Password is required')
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setErrorMessage('');
                const response = await fetch('http://localhost:8000/signin/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        email: values.email.trim().toLowerCase(),
                        password: values.password
                    }),
                });

                let responseData;
                try {
                    responseData = await response.json();
                } catch (parseError) {
                    console.error('Response parsing error:', parseError);
                    setErrorMessage('Unable to process server response. Please try again.');
                    return;
                }

                if (!response.ok) {
                    if (response.status === 404) {
                        console.error('Endpoint not found:', response.status);
                        setErrorMessage('Login service is unavailable. Please check if the server is running.');
                        return;
                    }

                    if (responseData.detail) {
                        setErrorMessage(responseData.detail);
                    } else if (responseData.error) {
                        setErrorMessage(responseData.error);
                    } else if (responseData.message) {
                        setErrorMessage(responseData.message);
                    } else {
                        setErrorMessage('Login failed. Please check your credentials and try again.');
                    }
                    return;
                }

                if (responseData.message === 'Login successful') {
                    // Store user data if available
                    if (responseData.user) {
                        localStorage.setItem('user', JSON.stringify(responseData.user));
                    }
                    navigate('/ai-questions');
                } else {
                    console.error('Invalid response format:', responseData);
                    setErrorMessage(responseData.message || 'Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Login error:', error);
                if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                    setErrorMessage('Unable to connect to the server. Please check if the server is running.');
                } else {
                    setErrorMessage('An unexpected error occurred. Please try again later.');
                }
            } finally {
                setSubmitting(false);
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

                {errorMessage && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                        {errorMessage}
                    </div>
                )}

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
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>

                    <p className="text-center text-blue-200/80">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-400 hover:text-blue-300">
                            Sign up
                        </Link>
                    </p>
                    {/* <div className='flex justify-center items-center '>
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
                    </div> */}

                </form>
            </div>
        </div>
    );
};

export default Login;