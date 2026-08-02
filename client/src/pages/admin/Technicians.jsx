import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';

const AdminTechnicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: 'All Services',
    experience: '',
    availability: 'Available',
    status: 'Available',
  });

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await api.get('/technicians');
        setTechnicians(response.data.data);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTechnicians();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTechnician) {
        await api.put(`/technicians/${editingTechnician._id}`, formData);
        toast.success('Technician updated successfully');
      } else {
        await api.post('/technicians', formData);
        toast.success('Technician created successfully');
      }

      setShowModal(false);
      setEditingTechnician(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialization: 'All Services',
        experience: '',
        availability: 'Available',
        status: 'Available',
      });

      const response = await api.get('/technicians');
      setTechnicians(response.data.data);
    } catch (error) {
      toast.error(editingTechnician ? 'Failed to update technician' : 'Failed to create technician');
    }
  };

  const handleEdit = (technician) => {
    setEditingTechnician(technician);
    setFormData({
      name: technician.name,
      email: technician.email,
      phone: technician.phone,
      specialization: technician.specialization,
      experience: technician.experience || '',
      availability: technician.availability,
      status: technician.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this technician?')) return;

    try {
      await api.delete(`/technicians/${id}`);
      toast.success('Technician deleted successfully');
      const response = await api.get('/technicians');
      setTechnicians(response.data.data);
    } catch (error) {
      toast.error('Failed to delete technician');
    }
  };

  const openAddModal = () => {
    setEditingTechnician(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: 'All Services',
      experience: '',
      availability: 'Available',
      status: 'Available',
    });
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Technicians</h1>
            <p className="text-gray-600">Add and manage service technicians</p>
          </div>
          <button onClick={openAddModal} className="btn-primary inline-flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            Add Technician
          </button>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Email</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Phone</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Specialization</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {technicians.map((technician) => (
                  <tr key={technician._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-gray-400" />
                        {technician.name}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{technician.email}</td>
                    <td className="py-4 px-4 text-gray-600">{technician.phone}</td>
                    <td className="py-4 px-4 text-gray-600">{technician.specialization}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(technician.status)}`}>
                        {technician.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(technician)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(technician._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {editingTechnician ? 'Edit Technician' : 'Add New Technician'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="label">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="label">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="label">Specialization</label>
                  <select
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="input"
                  >
                    <option value="All Services">All Services</option>
                    <option value="AC Repair">AC Repair</option>
                    <option value="AC Installation">AC Installation</option>
                    <option value="AC Maintenance">AC Maintenance</option>
                    <option value="Commercial AC">Commercial AC</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="label">Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="input"
                    placeholder="e.g., 5 years"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="label">Availability</label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="input"
                    >
                      <option value="Available">Available</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="input"
                    >
                      <option value="Available">Available</option>
                      <option value="Busy">Busy</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary flex-1">
                    {editingTechnician ? 'Update Technician' : 'Create Technician'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingTechnician(null);
                    }}
                    className="btn-outline flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTechnicians;
