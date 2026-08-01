import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Plus, Edit, Trash2, Wrench } from 'lucide-react';
import { toast } from 'sonner';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    image: '',
    features: '',
    isActive: true,
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        setServices(response.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const serviceData = {
      ...formData,
      features: formData.features.split('\n').filter(f => f.trim()),
    };

    try {
      if (editingService) {
        await api.put(`/services/${editingService._id}`, serviceData);
        toast.success('Service updated successfully');
      } else {
        await api.post('/services', serviceData);
        toast.success('Service created successfully');
      }
      
      setShowModal(false);
      setEditingService(null);
      setFormData({
        name: '',
        shortDescription: '',
        description: '',
        image: '',
        features: '',
        isActive: true,
      });
      
      const response = await api.get('/services');
      setServices(response.data.data);
    } catch (error) {
      toast.error(editingService ? 'Failed to update service' : 'Failed to create service');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      shortDescription: service.shortDescription,
      description: service.description,
      image: service.image || '',
      features: service.features?.join('\n') || '',
      isActive: service.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await api.delete(`/services/${id}`);
      toast.success('Service deleted successfully');
      const response = await api.get('/services');
      setServices(response.data.data);
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      name: '',
      shortDescription: '',
      description: '',
      image: '',
      features: '',
      isActive: true,
    });
    setShowModal(true);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Services</h1>
            <p className="text-gray-600">Add and manage AC services</p>
          </div>
          <button onClick={openAddModal} className="btn-primary inline-flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            Add Service
          </button>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Service Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Short Description</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{service.name}</td>
                    <td className="py-4 px-4 text-gray-600">{service.shortDescription}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
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
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="label">Service Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="label">Short Description *</label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="label">Detailed Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input"
                    rows="4"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="label">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="input"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="label">Features (one per line)</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="input"
                    rows="4"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Active</span>
                  </label>
                </div>
                
                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary flex-1">
                    {editingService ? 'Update Service' : 'Create Service'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingService(null);
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

export default AdminServices;
