import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'sonner';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    service: location.state?.serviceId || '',
    acType: '',
    acBrand: '',
    problemDescription: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await api.get('/services');
        setServices(response.data.data);
      } catch (error) {
        toast.error('Failed to load services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await api.post('/bookings', formData);
      toast.success('Booking created successfully!');
      setFormData({
        customerName: '',
        phone: '',
        email: '',
        service: location.state?.serviceId || '',
        acType: '',
        acBrand: '',
        problemDescription: '',
        address: '',
        preferredDate: '',
        preferredTime: '',
        notes: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Book a Service</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Schedule your AC service with our expert technicians
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Booking Form</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Customer Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="label">Name *</label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="label">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label">Service Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>
                </div>

                {/* Service Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h3>
                  
                  <div className="mb-4">
                    <label className="label">Service Type *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="label">AC Type *</label>
                      <select
                        name="acType"
                        value={formData.acType}
                        onChange={handleChange}
                        className="input"
                        required
                      >
                        <option value="">Select AC type</option>
                        <option value="Split AC">Split AC</option>
                        <option value="Window AC">Window AC</option>
                        <option value="Central AC">Central AC</option>
                        <option value="Cassette AC">Cassette AC</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="label">AC Brand</label>
                      <input
                        type="text"
                        name="acBrand"
                        value={formData.acBrand}
                        onChange={handleChange}
                        className="input"
                        placeholder="e.g., Daikin, LG, Samsung"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="label">Problem Description *</label>
                    <textarea
                      name="problemDescription"
                      value={formData.problemDescription}
                      onChange={handleChange}
                      className="input"
                      rows="4"
                      required
                      placeholder="Describe the issue with your AC..."
                    ></textarea>
                  </div>
                </div>

                {/* Scheduling */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Schedule</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="label">Preferred Date *</label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="input"
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <label className="label">Preferred Time *</label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="input"
                        required
                      >
                        <option value="">Select time slot</option>
                        <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                        <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                        <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
                        <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                        <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="label">Additional Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="input"
                      rows="3"
                      placeholder="Any additional information..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Booking Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
