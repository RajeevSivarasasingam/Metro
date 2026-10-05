import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileActions from './components/MobileActions';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
function RouteEffects() {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles = {
      '/': 'AC Services in Jaffna',
      '/services': 'Our Services',
      '/about': 'About Us',
      '/contact': 'Contact Us',
      '/booking': 'Book a Service'
    };
    document.title = `${titles[pathname] || 'AC Service'} | Metro Cool Engineering`;
    document.getElementById('main-content')?.focus({
      preventScroll: true
    });
  }, [pathname]);
  return null;
}
function App() {
  return <Router>
      <RouteEffects />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow" id="main-content" tabIndex={-1}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        <MobileActions />
      </div>
      <Toaster position="top-right" />
    </Router>;
}
export default App;
