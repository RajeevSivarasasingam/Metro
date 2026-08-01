import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { User, Mail, Phone } from 'lucide-react';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/bookings');
        const bookings = response.data.data;
        
        // Extract unique customers from bookings
        const uniqueCustomers = bookings.reduce((acc, booking) => {
          const existing = acc.find(c => c.email === booking.email);
          if (!existing) {
            acc.push({
              name: booking.customerName,
              email: booking.email,
              phone: booking.phone,
              address: booking.address,
              totalBookings: 1,
            });
          } else {
            existing.totalBookings += 1;
          }
          return acc;
        }, []);
        
        setCustomers(uniqueCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Customers</h1>
          <p className="text-gray-600">View customer information and booking history</p>
        </div>

        <div className="card">
          {customers.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No customers found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Email</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Phone</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Address</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Total Bookings</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">
                        <div className="flex items-center">
                          <User className="h-5 w-5 mr-2 text-gray-400" />
                          {customer.name}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {customer.email}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {customer.phone}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{customer.address}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                          {customer.totalBookings}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
