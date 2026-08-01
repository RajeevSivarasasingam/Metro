import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Calendar, Users, Wrench, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0,
    totalCustomers: 0,
    totalTechnicians: 0,
    totalServices: 0,
    totalMessages: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [bookingsRes, techniciansRes, servicesRes, messagesRes] = await Promise.all([
          api.get('/bookings'),
          api.get('/technicians'),
          api.get('/services'),
          api.get('/contact'),
        ]);

        const bookings = bookingsRes.data.data;
        const technicians = techniciansRes.data.data;
        const services = servicesRes.data.data;
        const messages = messagesRes.data.data;

        setStats({
          totalBookings: bookings.length,
          pendingBookings: bookings.filter(b => b.status === 'Pending').length,
          confirmedBookings: bookings.filter(b => b.status === 'Confirmed').length,
          completedBookings: bookings.filter(b => b.status === 'Completed').length,
          totalCustomers: 0, // Will need separate endpoint
          totalTechnicians: technicians.length,
          totalServices: services.length,
          totalMessages: messages.length,
        });

        setRecentBookings(bookings.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your business operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
              <Calendar className="h-12 w-12 text-primary-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingBookings}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-yellow-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Technicians</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTechnicians}</p>
              </div>
              <Wrench className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Messages</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalMessages}</p>
              </div>
              <MessageSquare className="h-12 w-12 text-green-600" />
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmedBookings}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">✓</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedBookings}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">✓</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Services</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalServices}</p>
              </div>
              <Wrench className="h-10 w-10 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/bookings" className="card hover:shadow-lg transition-shadow flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Manage Bookings</h3>
              <p className="text-gray-600 text-sm">View and update booking status</p>
            </div>
            <ArrowRight className="h-6 w-6 text-primary-600" />
          </Link>

          <Link to="/admin/technicians" className="card hover:shadow-lg transition-shadow flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Manage Technicians</h3>
              <p className="text-gray-600 text-sm">Add and manage technicians</p>
            </div>
            <ArrowRight className="h-6 w-6 text-primary-600" />
          </Link>

          <Link to="/admin/services" className="card hover:shadow-lg transition-shadow flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Manage Services</h3>
              <p className="text-gray-600 text-sm">Add and edit services</p>
            </div>
            <ArrowRight className="h-6 w-6 text-primary-600" />
          </Link>
        </div>

        {/* Recent Bookings */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-primary-600 hover:text-primary-700 font-semibold">
              View All
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((bookeing) => (
                <div key={bookeing._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{bookeing.service?.name || 'Service'}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bookeing.status)}`}>
                      {bookeing.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Booking ID: {bookeing.bookingId}</p>
                    <p>Customer: {bookeing.customerName}</p>
                    <p>Date: {new Date(bookeing.preferredDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
