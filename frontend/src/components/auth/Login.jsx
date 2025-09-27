import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '@/store/authSlice';
import { Button, Input, Card, CardHeader, CardContent, Select } from '@/components/ui';
import AuthLoadingWarning from './AuthLoadingWarning';
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const hasRedirected = useRef(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showHelpMessage, setShowHelpMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      role: 'student'
    }
  });

  // Watch form fields to clear help message when user starts typing
  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  useEffect(() => {
    if (showHelpMessage && (watchedEmail || watchedPassword)) {
      setShowHelpMessage(false);
    }
  }, [watchedEmail, watchedPassword, showHelpMessage]);

  // Handle redirect after successful login - prevent multiple redirects and toasts
  useEffect(() => {
    console.log('Login useEffect triggered:', { isAuthenticated, user, hasRedirected: hasRedirected.current });
    if (isAuthenticated && user && !hasRedirected.current) {
      hasRedirected.current = true;
      console.log('User role:', user.role);
      toast.success('Login successful!');
      
      const redirectPath = user.role === 'student' ? '/student/dashboard' : '/professor/dashboard';
      console.log('Redirecting to:', redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Handle errors with better UX messaging
  useEffect(() => {
    if (error) {
      let userFriendlyMessage = error;
      
      // Improve error messages for better UX
      if (error.includes('Invalid credentials')) {
        setLoginAttempts(prev => prev + 1);
        userFriendlyMessage = 'Invalid email or password. Please check your credentials and try again.';
        
        // Show help message after 2 failed attempts
        if (loginAttempts >= 1) {
          setShowHelpMessage(true);
        }
      } else if (error.includes('Login failed')) {
        userFriendlyMessage = 'Login failed. Please check your email and password, or try again later.';
      } else if (error.includes('Network Error') || error.includes('timeout')) {
        userFriendlyMessage = 'Connection error. Please check your internet connection and try again.';
      } else if (error.includes('Please provide both email and password')) {
        userFriendlyMessage = 'Please enter both your email and password.';
      }
      
      toast.error(userFriendlyMessage, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FEF2F2',
          color: '#DC2626',
          border: '1px solid #FCA5A5',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: '500',
          maxWidth: '400px'
        }
      });
      dispatch(clearError());
    }
  }, [error, dispatch, loginAttempts]);

  const onSubmit = async (data) => {
    // Clear any previous help messages
    setShowHelpMessage(false);
    
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#000" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      {/* Left side - Website Information */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-8 py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center mb-8">
            <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">College Appointment System</h1>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Streamline Your Academic Journey
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Connect with professors, schedule appointments, and manage your academic consultations all in one place.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Easy Scheduling</h3>
                <p className="text-gray-600">Book appointments with professors at your convenience</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Seamless Communication</h3>
                <p className="text-gray-600">Stay connected with your academic mentors</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Smart Management</h3>
                <p className="text-gray-600">Track your appointments and academic progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="bg-white shadow-xl border-0 rounded-2xl">
          <CardContent className="p-8">
            <AuthLoadingWarning isVisible={isLoading} />
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Select
                label="Role"
                required
                disabled={isLoading}
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'professor', label: 'Professor' }
                ]}
                {...register('role', { required: 'Please select your role' })}
                error={errors.role?.message}
              />

              <Input
                label="Email Address"
                type="email"
                required
                placeholder="Enter your email"
                disabled={isLoading}
                {...register('email', {
                  required: 'Please enter your email address',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address (e.g., student@college.edu)'
                  }
                })}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                type="password"
                required
                placeholder="Enter your password"
                disabled={isLoading}
                {...register('password', {
                  required: 'Please enter your password',
                  minLength: {
                    value: 7,
                    message: 'Password must be at least 7 characters long'
                  }
                })}
                error={errors.password?.message}
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors duration-200 focus:ring-4 focus:ring-blue-200"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              {/* Help message after failed attempts */}
              {showHelpMessage && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        Having trouble signing in?
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Double-check your email address and password</li>
                          <li>Make sure you've selected the correct role (Student/Professor)</li>
                          <li>Password is case-sensitive</li>
                          <li>If you don't have an account, click "Create New Account" below</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/register"
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Create New Account
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            College Appointment System - Secure & Professional
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;