import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Search, Filter, CheckCircle, XCircle, User, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, techniciansRes] = await Promise.all([
          api.get('/bookings'),
          api.get('/technicians'),
        ]);
        setBookings(bookingsRes.data.data);
        setTechnicians(techniciansRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status });
      toast.success('Status updated successfully');
      const response = await api.get('/bookings');
      setBookings(response.data.data);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleAssignTechnician = async (technicianId) => {
    try {
      await api.put(`/bookings/${selectedBooking._id}/assign-technician`, { technicianId });
      toast.success('Technician assigned successfully');
      setShowAssignModal(false);
      setSelectedBooking(null);
      const response = await api.get('/bookings');
      setBookings(response.data.data);
    } catch (error) {
      toast.error('Failed to assign technician');
    }
  };

  const openAssignModal = (booking) => {
    setSelectedBooking(booking);
    setShowAssignModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Bookings</h1>
          <p className="text-gray-600">View and manage all service bookings</p>
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

        {/* Bookings Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Booking ID</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Customer</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Service</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Technician</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{booking.bookingId}</td>
                    <td className="py-4 px-4 text-gray-600">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        {booking.customerName}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{booking.service?.name || 'N/A'}</td>
                    <td className="py-4 px-4 text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {new Date(booking.preferredDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {booking.technician ? booking.technician.name : 'Not assigned'}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Assigned">Assigned</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        {!booking.technician && booking.status !== 'Cancelled' && (
                          <button
                            onClick={() => openAssignModal(booking)}
                            className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded hover:bg-primary-200"
                          >
                            Assign
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assign Technician Modal */}
        {showAssignModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Assign Technician</h3>
              <p className="text-gray-600 mb-4">
                Booking: {selectedBooking.bookingId} - {selectedBooking.service?.name}
              </p>
              <div className="space-y-2 mb-4">
                {technicians.filter(t => t.status === 'Available').length === 0 ? (
                  <p className="text-gray-500">No available technicians</p>
                ) : (
                  technicians.filter(t => t.status === 'Available').map((technician) => (
                    <button
                      key={technician._id}
                      onClick={() => handleAssignTechnician(technician._id)}
                      className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-semibold text-gray-900">{technician.name}</div>
                      <div className="text-sm text-gray-600">{technician.specialization}</div>
                      <div className="text-sm text-gray-600">{technician.phone}</div>
                    </button>
                  ))
                )}
              </div>
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedBooking(null);
                }}
                className="btn-outline w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
