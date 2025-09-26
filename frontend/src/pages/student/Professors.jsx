import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../../services';
import { Card, CardHeader, CardContent, Button, LoadingSpinner, Input } from '../../components/ui';
import BookingModal from '../../components/BookingModal';
import toast from 'react-hot-toast';

const StudentProfessors = () => {
  const [professors, setProfessors] = useState([]);
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    professor: null
  });

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        setIsLoading(true);
        const response = await studentService.getAllProfessors();
        setProfessors(response.professors || []);
        setFilteredProfessors(response.professors || []);
      } catch (error) {
        console.error('Error fetching professors:', error);
        toast.error('Failed to load professors');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  useEffect(() => {
    let filtered = professors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(professor =>
        professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (professor.specialization && professor.specialization.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (professor.department && professor.department.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by department
    if (selectedDepartment) {
      filtered = filtered.filter(professor => 
        professor.department === selectedDepartment
      );
    }

    setFilteredProfessors(filtered);
  }, [searchTerm, selectedDepartment, professors]);

  const handleBookAppointment = (professor) => {
    setBookingModal({
      isOpen: true,
      professor
    });
  };

  const handleCloseBookingModal = () => {
    setBookingModal({
      isOpen: false,
      professor: null
    });
  };

  const handleBookingSuccess = () => {
    // Optionally refresh data or show success message
    toast.success('Appointment booked successfully!');
  };

  // Get unique departments for filter
  const departments = [...new Set(professors.map(prof => prof.department).filter(Boolean))];

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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Browse Professors</h1>
        <p className="text-blue-100">
          Find the right professor for your academic needs and book appointments easily.
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by name, specialization, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Departments</option>
                {departments.map(department => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredProfessors.length} professor{filteredProfessors.length !== 1 ? 's' : ''} found
        </p>
        {(searchTerm || selectedDepartment) && (
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedDepartment('');
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Professors Grid */}
      {filteredProfessors.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No professors found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedDepartment 
                ? "Try adjusting your search criteria" 
                : "No professors are currently available"
              }
            </p>
            {(searchTerm || selectedDepartment) && (
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedDepartment('');
              }}>
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessors.map((professor) => (
            <Card key={professor._id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {professor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{professor.name}</h3>
                    <p className="text-gray-600">{professor.department || 'Professor'}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {professor.specialization && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Specialization:</p>
                      <p className="text-gray-600">{professor.specialization}</p>
                    </div>
                  )}
                  
                  {professor.workingHour && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Working Hours:</p>
                      <p className="text-gray-600">{professor.workingHour}</p>
                    </div>
                  )}

                  {professor.email && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email:</p>
                      <p className="text-gray-600">{professor.email}</p>
                    </div>
                  )}

                  {professor.rating && (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(professor.rating) 
                                ? 'text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          {professor.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 space-y-2">
                    <Button
                      onClick={() => handleBookAppointment(professor)}
                      className="w-full"
                    >
                      Book Appointment
                    </Button>
                    <Link to={`/student/professors/${professor._id}`}>
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={handleCloseBookingModal}
        professor={bookingModal.professor}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
};

export default StudentProfessors;