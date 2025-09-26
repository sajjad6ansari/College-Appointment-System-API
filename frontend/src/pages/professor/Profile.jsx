import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { professorService } from '../../services';
import { Card, CardHeader, CardContent, Button, Input, LoadingSpinner } from '../../components/ui';
import toast from 'react-hot-toast';

const ProfessorProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    department: '',
    specialization: '',
    phone: '',
    bio: '',
    officeLocation: '',
    officeHours: '',
    qualifications: '',
    experience: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await professorService.getProfile();
        if (response.professor) {
          setProfile({
            name: response.professor.name || '',
            email: response.professor.email || '',
            department: response.professor.department || '',
            specialization: response.professor.specialization || '',
            phone: response.professor.phone || '',
            bio: response.professor.bio || '',
            officeLocation: response.professor.officeLocation || '',
            officeHours: response.professor.workingHour || response.professor.officeHours || '',
            qualifications: response.professor.qualifications || response.professor.title || '',
            experience: response.professor.experience || (response.professor.yearsOfExperience ? `${response.professor.yearsOfExperience} years` : '')
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
      // Map frontend fields to backend fields
      const profileData = {
        name: profile.name,
        email: profile.email,
        department: profile.department,
        specialization: profile.specialization,
        phone: profile.phone,
        bio: profile.bio,
        officeLocation: profile.officeLocation,
        workingHour: profile.officeHours,
        qualifications: profile.qualifications,
        experience: profile.experience,
        // Extract years from experience string if it exists
        yearsOfExperience: profile.experience ? parseInt(profile.experience.replace(/\D/g, '')) || 0 : 0
      };

      const response = await professorService.updateProfile(profileData);
      toast.success('Profile updated successfully!');
      setIsEditMode(false);
      
      // Update the profile state with the returned data
      if (response.professor) {
        setProfile({
          name: response.professor.name || '',
          email: response.professor.email || '',
          department: response.professor.department || '',
          specialization: response.professor.specialization || '',
          phone: response.professor.phone || '',
          bio: response.professor.bio || '',
          officeLocation: response.professor.officeLocation || '',
          officeHours: response.professor.workingHour || response.professor.officeHours || '',
          qualifications: response.professor.qualifications || response.professor.title || '',
          experience: response.professor.experience || (response.professor.yearsOfExperience ? `${response.professor.yearsOfExperience} years` : '')
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
                {profile.name?.charAt(0) || 'P'}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{profile.name || 'Not provided'}</h3>
                <p className="text-gray-600">{profile.email || 'Not provided'}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Department</label>
                <p className="text-gray-900">{profile.department || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900">{profile.phone || 'Not provided'}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Specialization</label>
              <p className="text-gray-900">{profile.specialization || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Experience</label>
              <p className="text-gray-900">{profile.experience || 'Not provided'}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Qualifications</label>
            <p className="text-gray-900">{profile.qualifications || 'Not provided'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Bio</label>
            <p className="text-gray-900">{profile.bio || 'Not provided'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Office Information */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Office Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Office Location</label>
              <p className="text-gray-900">{profile.officeLocation || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Office Hours</label>
              <p className="text-gray-900">{profile.officeHours || 'Not provided'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
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
      {isEditMode ? (
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
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Academic Information</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <Input
                  type="text"
                  value={profile.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  placeholder="e.g., Machine Learning, Data Structures"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <Input
                  type="text"
                  value={profile.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="e.g., 10 years"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualifications
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                rows={3}
                value={profile.qualifications}
                onChange={(e) => handleInputChange('qualifications', e.target.value)}
                placeholder="Enter your educational qualifications, degrees, certifications..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio / About Me
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                rows={4}
                value={profile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell students about yourself, your teaching philosophy, research interests..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Office Information */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Office Information</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Location
                </label>
                <Input
                  type="text"
                  value={profile.officeLocation}
                  onChange={(e) => handleInputChange('officeLocation', e.target.value)}
                  placeholder="e.g., Room 203, Building A"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Hours
                </label>
                <Input
                  type="text"
                  value={profile.officeHours}
                  onChange={(e) => handleInputChange('officeHours', e.target.value)}
                  placeholder="e.g., Mon-Fri 2:00-4:00 PM"
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
      ) : (
        renderProfileView()
      )}
    </div>
  );
};

export default ProfessorProfile;