import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Calendar, Clock, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings/my');
        setBookings(response.data.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Assigned':
        return 'bg-purple-100 text-purple-800';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = searchTerm === '' || 
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.service?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage your service bookings</p>
          </div>
          <Link to="/booking" className="btn-primary">
            Book New Service
          </Link>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="card">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="card">
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">No bookings found</p>
              <Link to="/booking" className="btn-primary">
                Book Your First Service
              </Link>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Booking ID</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Service</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Time</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Technician</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{booking.bookingId}</td>
                      <td className="py-4 px-4 text-gray-600">{booking.service?.name || 'N/A'}</td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(booking.preferredDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-gray-600">{booking.preferredTime}</td>
                      <td className="py-4 px-4 text-gray-600">
                        {booking.technician ? booking.technician.name : 'Not assigned'}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Link
                          to={`/dashboard/bookings/${booking._id}`}
                          className="text-primary-600 hover:text-primary-700 font-semibold"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerBookings;
