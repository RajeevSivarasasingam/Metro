import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import CustomerBookings from './pages/customer/Bookings';
import CustomerProfile from './pages/customer/Profile';
import BookingDetail from './pages/customer/BookingDetail';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminBookings from './pages/admin/Bookings';
import AdminServices from './pages/admin/Services';
import AdminTechnicians from './pages/admin/Technicians';
import AdminCustomers from './pages/admin/Customers';
import AdminReviews from './pages/admin/Reviews';
import AdminMessages from './pages/admin/Messages';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/booking" element={<Booking />} />

            {/* Customer Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/bookings" element={
              <ProtectedRoute>
                <CustomerBookings />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/bookings/:id" element={
              <ProtectedRoute>
                <BookingDetail />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/profile" element={
              <ProtectedRoute>
                <CustomerProfile />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/bookings" element={
              <AdminRoute>
                <AdminBookings />
              </AdminRoute>
            } />
            <Route path="/admin/services" element={
              <AdminRoute>
                <AdminServices />
              </AdminRoute>
            } />
            <Route path="/admin/technicians" element={
              <AdminRoute>
                <AdminTechnicians />
              </AdminRoute>
            } />
            <Route path="/admin/customers" element={
              <AdminRoute>
                <AdminCustomers />
              </AdminRoute>
            } />
            <Route path="/admin/reviews" element={
              <AdminRoute>
                <AdminReviews />
              </AdminRoute>
            } />
            <Route path="/admin/messages" element={
              <AdminRoute>
                <AdminMessages />
              </AdminRoute>
            } />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
