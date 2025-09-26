import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { studentService } from '../../services';
import { Card, CardHeader, CardContent, Button, Input, LoadingSpinner } from '../../components/ui';
import toast from 'react-hot-toast';

const StudentProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    studentId: '',
    department: '',
    year: '',
    program: '',
    phone: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    interests: '',
    bio: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await studentService.getProfile();
        if (response.student) {
          setProfile({
            name: response.student.name || '',
            email: response.student.email || '',
            studentId: response.student.studentId || '',
            department: response.student.department || '',
            year: response.student.year || '',
            program: response.student.program || '',
            phone: response.student.phone || '',
            address: response.student.address || '',
            emergencyContact: response.student.emergencyContact || '',
            emergencyPhone: response.student.emergencyPhone || '',
            interests: response.student.interests || '',
            bio: response.student.bio || ''
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
        
        // Use user data as fallback
        if (user) {
          setProfile(prev => ({
            ...prev,
            name: user.name || '',
            email: user.email || '',
            studentId: user.studentId || '',
            department: user.department || ''
          }));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await studentService.updateProfile(profile);
      toast.success('Profile updated successfully!');
      setIsEditMode(false);
      
      // Update the profile state with the returned data
      if (response.student) {
        setProfile({
          name: response.student.name || '',
          email: response.student.email || '',
          studentId: response.student.studentId || '',
          department: response.student.department || '',
          year: response.student.year || '',
          program: response.student.program || '',
          phone: response.student.phone || '',
          address: response.student.address || '',
          emergencyContact: response.student.emergencyContact || '',
          emergencyPhone: response.student.emergencyPhone || '',
          interests: response.student.interests || '',
          bio: response.student.bio || ''
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      
      // Handle different types of errors
      if (error.response?.data?.errors) {
        // Validation errors from backend
        const errorMessages = error.response.data.errors.join(', ');
        toast.error(`Validation failed: ${errorMessages}`);
      } else if (error.response?.data?.message) {
        // Server error message
        toast.error(error.response.data.message);
      } else if (error.response?.status === 500) {
        // Server error
        toast.error('Server error occurred. Please try again later.');
      } else if (error.response?.status === 400) {
        // Bad request
        toast.error('Invalid data provided. Please check your input.');
      } else {
        // Generic error
        toast.error('Failed to update profile. Please try again.');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const renderProfileView = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {profile.name?.charAt(0) || 'S'}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{profile.name || 'Not provided'}</h3>
                <p className="text-gray-600">{profile.email || 'Not provided'}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Student ID</label>
                <p className="text-gray-900">{profile.studentId || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Department</label>
                <p className="text-gray-900">{profile.department || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Academic Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Program</label>
              <p className="text-gray-900">{profile.program || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Year</label>
              <p className="text-gray-900">{profile.year || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-gray-900">{profile.phone || 'Not provided'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p className="text-gray-900">{profile.address || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
              <p className="text-gray-900">{profile.emergencyContact || 'Not provided'}</p>
              {profile.emergencyPhone && (
                <p className="text-sm text-gray-600">{profile.emergencyPhone}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Interests</label>
            <p className="text-gray-900">{profile.interests || 'Not provided'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Bio</label>
            <p className="text-gray-900">{profile.bio || 'Not provided'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEditForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <Input
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student ID *
              </label>
              <Input
                type="text"
                value={profile.studentId}
                onChange={(e) => handleInputChange('studentId', e.target.value)}
                placeholder="Enter your student ID"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              rows={2}
              value={profile.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your current address"
            />
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Academic Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <Input
                type="text"
                value={profile.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                placeholder="e.g., Computer Science"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year
              </label>
              <select
                value={profile.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduate">Graduate</option>
                <option value="Post-Graduate">Post-Graduate</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program
              </label>
              <select
                value={profile.program}
                onChange={(e) => handleInputChange('program', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Program</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
                <option value="Diploma">Diploma</option>
                <option value="Certificate">Certificate</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Academic Interests
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              rows={3}
              value={profile.interests}
              onChange={(e) => handleInputChange('interests', e.target.value)}
              placeholder="List your academic interests, subjects you enjoy, career goals..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Me
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              rows={4}
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell professors about yourself, your background, learning style, goals..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Emergency Contact</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact Name
              </label>
              <Input
                type="text"
                value={profile.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                placeholder="Name of emergency contact"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact Phone
              </label>
              <Input
                type="tel"
                value={profile.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                placeholder="Emergency contact phone number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancelEdit}
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isUpdating}
          className="bg-green-600 hover:bg-green-700"
        >
          {isUpdating ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Updating...
            </>
          ) : (
            'Update Profile'
          )}
        </Button>
      </div>
    </form>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-green-100">
              {isEditMode ? 'Edit your personal information and academic details.' : 'View your personal information and academic details.'}
            </p>
          </div>
          <div className="flex space-x-3">
            {!isEditMode ? (
              <Button
                onClick={() => setIsEditMode(true)}
                variant="outline"
                className="bg-white text-green-600 hover:bg-gray-100 border-white"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="bg-transparent text-white hover:bg-white hover:text-green-600 border-white"
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {isEditMode ? renderEditForm() : renderProfileView()}
    </div>
  );
};

export default StudentProfile;