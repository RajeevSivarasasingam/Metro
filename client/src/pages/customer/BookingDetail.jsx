import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { ArrowLeft, Calendar, Clock, MapPin, User, Wrench, Star } from 'lucide-react';
import { toast } from 'sonner';

const BookingDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get(`/bookings/${id}`);
        setBooking(response.data.data);
      } catch (error) {
        toast.error('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

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

  const statusSteps = ['Pending', 'Confirmed', 'Assigned', 'In Progress', 'Completed'];
  const currentStepIndex = statusSteps.indexOf(booking?.status);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);

    try {
      await api.post('/reviews', {
        booking: id,
        rating: reviewData.rating,
        comment: reviewData.comment,
      });
      toast.success('Review submitted successfully!');
      setShowReviewForm(false);
      setReviewData({ rating: 5, comment: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Booking not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard/bookings" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bookings
        </Link>

        <div className="card mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Details</h1>
              <p className="text-gray-600">Booking ID: {booking.bookingId}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>

          {/* Status Timeline */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Status</h2>
            <div className="flex items-center justify-between">
              {statusSteps.map((step, index) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= currentStepIndex ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`text-sm mt-2 ${
                      index <= currentStepIndex ? 'text-primary-600 font-medium' : 'text-gray-400'
                    }`}>
                      {step}
                    </span>
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      index < currentStepIndex ? 'bg-primary-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Booking Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Wrench className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Service</p>
                    <p className="font-medium text-gray-900">{booking.service?.name || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Preferred Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(booking.preferredDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Preferred Time</p>
                    <p className="font-medium text-gray-900">{booking.preferredTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{booking.customerName}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">{booking.address}</p>
                  </div>
                </div>
                {booking.technician && (
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Assigned Technician</p>
                      <p className="font-medium text-gray-900">{booking.technician.name}</p>
                      <p className="text-sm text-gray-600">{booking.technician.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Problem Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Problem Description</h2>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{booking.problemDescription}</p>
          </div>

          {/* AC Details */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">AC Type</h2>
              <p className="text-gray-600">{booking.acType}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">AC Brand</h2>
              <p className="text-gray-600">{booking.acBrand || 'Not specified'}</p>
            </div>
          </div>

          {/* Review Section */}
          {booking.status === 'Completed' && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              {!showReviewForm ? (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="btn-primary inline-flex items-center"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Leave a Review
                </button>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Your Review</h3>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <label className="label">Rating</label>
                      <select
                        value={reviewData.rating}
                        onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value) })}
                        className="input"
                      >
                        <option value="5">5 Stars - Excellent</option>
                        <option value="4">4 Stars - Very Good</option>
                        <option value="3">3 Stars - Good</option>
                        <option value="2">2 Stars - Fair</option>
                        <option value="1">1 Star - Poor</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="label">Comment</label>
                      <textarea
                        value={reviewData.comment}
                        onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                        className="input"
                        rows="4"
                        required
                        placeholder="Share your experience..."
                      ></textarea>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
