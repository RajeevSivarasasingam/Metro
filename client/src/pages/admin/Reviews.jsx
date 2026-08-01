import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { CheckCircle, Trash2, Star, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get('/reviews/all');
        setReviews(response.data.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/reviews/${id}/approve`);
      toast.success('Review approved successfully');
      const response = await api.get('/reviews/all');
      setReviews(response.data.data);
    } catch (error) {
      toast.error('Failed to approve review');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await api.delete(`/reviews/${id}`);
      toast.success('Review deleted successfully');
      const response = await api.get('/reviews/all');
      setReviews(response.data.data);
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === 'all') return true;
    if (filter === 'approved') return review.isApproved;
    if (filter === 'pending') return !review.isApproved;
    return true;
  });

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Reviews</h1>
            <p className="text-gray-600">Approve and manage customer reviews</p>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input"
          >
            <option value="all">All Reviews</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
          </select>
        </div>

        <div className="card">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No reviews found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div key={review._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <h3 className="font-semibold text-gray-900">{review.user?.name || 'Anonymous'}</h3>
                      <p className="text-sm text-gray-600">Booking: {review.booking?.bookingId || 'N/A'}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      review.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {review.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">"{review.comment}"</p>
                  
                  <div className="flex items-center space-x-2">
                    {!review.isApproved && (
                      <button
                        onClick={() => handleApprove(review._id)}
                        className="flex items-center text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="h-5 w-5 mr-1" />
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="flex items-center text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5 mr-1" />
                      Delete
                    </button>
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

export default AdminReviews;
