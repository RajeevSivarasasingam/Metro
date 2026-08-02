import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { CheckCircle, Trash2, Mail, Search } from 'lucide-react';
import { toast } from 'sonner';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('/contact');
        setMessages(response.data.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/contact/${id}/status`, { status });
      toast.success('Status updated successfully');
      const response = await api.get('/contact');
      setMessages(response.data.data);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Message deleted successfully');
      const response = await api.get('/contact');
      setMessages(response.data.data);
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter((message) => {
    const matchesFilter = filter === 'all' || message.status === filter;
    const matchesSearch = searchTerm === '' || 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Read':
        return 'bg-yellow-100 text-yellow-800';
      case 'Replied':
        return 'bg-green-100 text-green-800';
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Messages</h1>
          <p className="text-gray-600">View and manage contact form submissions</p>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="New">New</option>
              <option value="Read">Read</option>
              <option value="Replied">Replied</option>
            </select>
          </div>
        </div>

        <div className="card">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No messages found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div key={message._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{message.subject}</h3>
                      <p className="text-sm text-gray-600">{message.name} - {message.email}</p>
                      {message.phone && <p className="text-sm text-gray-600">{message.phone}</p>}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{message.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-2">
                      <select
                        value={message.status}
                        onChange={(e) => handleStatusUpdate(message._id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="New">New</option>
                        <option value="Read">Read</option>
                        <option value="Replied">Replied</option>
                      </select>
                      <button
                        onClick={() => handleDelete(message._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
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

export default AdminMessages;
