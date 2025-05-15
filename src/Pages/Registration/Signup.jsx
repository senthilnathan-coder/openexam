import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaImage } from 'react-icons/fa';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [profilePreview, setProfilePreview] = useState(null);

    const formik = useFormik({
        initialValues: {
            profile: null,
            fullName: '',
            countryCode: '+91',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            profile: Yup.mixed()
                .required('Profile image is required'),
            fullName: Yup.string()
                .required('Full name is required')
                .min(2, 'Full name must be at least 2 characters')
                .max(100, 'Full name must not exceed 100 characters')
                .trim(),
            countryCode: Yup.string()
                .required('Country code is required')
                .matches(/^\+91$/, 'Only Indian country code (+91) is supported'),
            phoneNumber: Yup.string()
                .required('Phone number is required')
                .matches(/^[6-9]\d{9}$/, 'Phone number must start with 6-9 and be exactly 10 digits'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required')
                .trim()
                .lowercase(),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Please confirm your password')
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                setErrorMessage('');
                const formData = new FormData();
                formData.append('profile', values.profile);
                formData.append('full_name', values.fullName.trim());
                formData.append('country_code', values.countryCode);
                formData.append('phone_number', values.phoneNumber);
                formData.append('email', values.email.trim().toLowerCase());
                formData.append('password', values.password);
                formData.append('confirm_password', values.confirmPassword);

                const response = await fetch('http://localhost:8000/signup/', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    navigate('/login');
                } else {
                    const errorData = await response.json();
                    if (errorData.error) {
                        setErrorMessage(errorData.error);
                        if (errorData.error.includes('phone number')) {
                            setFieldError('phoneNumber', errorData.error);
                        }
                        if (errorData.error.includes('Password')) {
                            setFieldError('password', errorData.error);
                        }
                    }
                }
            } catch (error) {
                setErrorMessage('Network error. Please try again.');
            } finally {
                setSubmitting(false);
            }
        }
    });

    const handleProfileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            formik.setFieldValue('profile', file);
            setProfilePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                    <p className="mt-2 text-blue-200/80">Join us to explore AI-powered learning</p>
                </div>

                {errorMessage && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                        {errorMessage}
                    </div>
                )}

                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="text-center">
                        <div className="relative inline-block">
                            <input
                                type="file"
                                id="profile"
                                name="profile"
                                accept="image/*"
                                onChange={handleProfileChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="profile"
                                className="cursor-pointer block w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 hover:border-blue-500 transition-colors duration-300"
                            >
                                {profilePreview ? (
                                    <img
                                        src={profilePreview}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/10">
                                        <FaImage className="text-4xl text-blue-200/60" />
                                    </div>
                                )}
                            </label>
                        </div>
                        {formik.touched.profile && formik.errors.profile && (
                            <p className="mt-1 text-red-400 text-sm">{formik.errors.profile}</p>
                        )}
                    </div>

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

                    <div className="flex space-x-4">
                        <div className="w-1/3">
                            <div className="relative">
                                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
                                <input
                                    {...formik.getFieldProps('countryCode')}
                                    placeholder="+91"
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {formik.touched.countryCode && formik.errors.countryCode && (
                                <p className="mt-1 text-red-400 text-sm">{formik.errors.countryCode}</p>
                            )}
                        </div>
                        <div className="w-2/3">
                            <div className="relative">
                                <input
                                    {...formik.getFieldProps('phoneNumber')}
                                    placeholder="Phone Number"
                                    className="w-full pl-4 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <p className="mt-1 text-red-400 text-sm">{formik.errors.phoneNumber}</p>
                            )}
                        </div>
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

                    <div>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
                            <input
                                {...formik.getFieldProps('confirmPassword')}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/60 hover:text-blue-200"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className="mt-1 text-red-400 text-sm">{formik.errors.confirmPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Signing up...' : 'Sign Up'}
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
