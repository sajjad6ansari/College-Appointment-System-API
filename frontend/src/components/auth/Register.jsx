import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '@/store/authSlice';
import { Button, Input, Card, CardHeader, CardContent, Select } from '@/components/ui';
import toast from 'react-hot-toast';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const hasRedirected = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student'
    }
  });

  const password = watch('password');

  // Handle redirect after successful registration - prevent multiple redirects and toasts
  useEffect(() => {
    if (isAuthenticated && user && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.success('Registration successful!');
      
      const redirectPath = user.role === 'student' ? '/student/dashboard' : '/professor/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const { confirmPassword, ...userData } = data;
    dispatch(registerUser(userData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our appointment system
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Select
                label="I am a"
                required
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'professor', label: 'Professor' }
                ]}
                {...register('role', { required: 'Please select your role' })}
                error={errors.role?.message}
              />

              <Input
                label="Full Name"
                type="text"
                required
                placeholder="Enter your full name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
                error={errors.name?.message}
              />

              <Input
                label="Email Address"
                type="email"
                required
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                type="password"
                required
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 7,
                    message: 'Password must be at least 7 characters'
                  }
                })}
                error={errors.password?.message}
              />

              <Input
                label="Confirm Password"
                type="password"
                required
                placeholder="Confirm your password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match'
                })}
                error={errors.confirmPassword?.message}
              />

              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Sign In Instead
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;