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
      profile: Yup.mixed().required('Profile image is required'),
      fullName: Yup.string()
        .required('Full name is required')
        .min(2, 'Must be at least 2 characters')
        .max(100, 'Too long')
        .trim(),
      countryCode: Yup.string()
        .required('Country code is required')
        .matches(/^\+91$/, 'Only +91 supported'),
      phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[6-9]\d{9}$/, 'Must be 10 digits starting with 6-9'),
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email format')
        .trim()
        .lowercase(),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'At least 8 characters'),
      confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
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
          headers: { Accept: 'application/json' },
          body: formData,
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          navigate('/login');
        } else {
          setErrorMessage(data.error || 'Signup failed.');
          if (data.error?.includes('phone')) setFieldError('phoneNumber', data.error);
          if (data.error?.includes('Password')) setFieldError('password', data.error);
        }
      } catch (error) {
        setErrorMessage('Network error. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  });

  const handleProfileChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue('profile', file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-900 py-8 px-4 mt-20">
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
          {/* Profile Image Upload */}
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
                className="cursor-pointer block w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 hover:border-blue-500 transition"
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

          {/* Full Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
            <input
              {...formik.getFieldProps('fullName')}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="mt-1 text-red-400 text-sm">{formik.errors.fullName}</p>
            )}
          </div>

          {/* Phone Inputs */}
          <div className="flex space-x-4">
            <div className="w-1/3 relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60 rotate-90" />
              <input
                {...formik.getFieldProps('countryCode')}
                placeholder="+91"
                className="w-full pl-10 pr-2 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
              />
              {formik.touched.countryCode && formik.errors.countryCode && (
                <p className="mt-1 text-red-400 text-sm">{formik.errors.countryCode}</p>
              )}
            </div>
            <div className="w-2/3 relative">
              <input
                {...formik.getFieldProps('phoneNumber')}
                placeholder="Phone Number"
                className="w-full pl-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="mt-1 text-red-400 text-sm">{formik.errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
            <input
              {...formik.getFieldProps('email')}
              type="email"
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-red-400 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
            <input
              {...formik.getFieldProps('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/70 hover:text-white"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-red-400 text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/60" />
            <input
              {...formik.getFieldProps('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/70 hover:text-white"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="mt-1 text-red-400 text-sm">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="text-center text-sm text-blue-100 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-300 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
