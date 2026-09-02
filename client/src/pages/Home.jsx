import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Shield, DollarSign, Star, CheckCircle, MessageCircle } from 'lucide-react';
import api from '../services/api';
import { ServicesGrid } from './Services';
 
import img1 from '../assets/hero1.jpg';
import img2 from '../assets/hero2.jpg';
import img3 from '../assets/hero3.jpg';
import companyImage from '../assets/logo.png';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const serviceImages = [img1, img2, img3];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % serviceImages.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [serviceImages.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsRes = await api.get('/reviews');
        setReviews(reviewsRes.data.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen md:min-h-[520px] lg:min-h-[700px] text-white">
        <div className="absolute inset-0 ">
          <div
            className="flex h-full w-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {serviceImages.map((image, index) => (
              <div
                key={index}
                className="w-full h-screen md:h-[520px] lg:h-[700px] flex-shrink-0 bg-cover bg-center" 
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.6) 40%, rgba(15, 23, 42, 0.45) 100%), url(${image})`,
                  backgroundAttachment: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-slate-900/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
              <p className="text-lg text-primary-400 font-semibold mb-4 flex items-center gap-2">
                 
                <CheckCircle className="h-6 w-6" />
                Trusted AC Services
              </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Reliable AC Solutions for Your Home and Business
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Professional AC repair, installation, and maintenance services. Fast response and quality workmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking" className="btn-primary text-center">
                Book a Service
              </Link>
              <Link to="/contact" className="btn-outline text-center">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
            {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {serviceImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === index ? 'w-8 bg-white' : 'w-2.5 bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden rounded-[28px] shadow-2xl shadow-primary-100/60">
              <img
                src={companyImage}
                alt="Metro Cool Engineering AC service team"
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/20 via-transparent to-primary-500/20" />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-600 mb-4">
                Welcome to Metro Cool Engineering
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                We keep homes and businesses cool, comfortable, and running smoothly.
              </h2>
              <p className="text-lg text-gray-600 mb-5">
                Metro Cool Engineering has built a trusted reputation for dependable AC installation,
                repair, and maintenance services tailored to both residential and commercial clients.
              </p>
              <p className="text-gray-600 mb-8">
                Our experienced team combines technical expertise, honest advice, and responsive service to
                keep your cooling systems efficient, energy-saving, and reliable all year round.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-primary-100 bg-primary-50 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-primary-700">10+ Years</p>
                  <p className="text-sm text-gray-600 mt-1">Industry experience</p>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-sky-700">24/7</p>
                  <p className="text-sm text-gray-600 mt-1">Customer support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesGrid
        title="Our Services"
        subtitle="We offer comprehensive AC services to keep your cooling systems running efficiently"
        showViewAll={true}
        limit={3}
      />

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600 mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quality service you can trust</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best AC services with unmatched quality and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary-200">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Fast Response</h3>
              <p className="text-gray-600">Quick turnaround times for all your AC service needs</p>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary-200">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                <Shield className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Professional Service</h3>
              <p className="text-gray-600">Certified technicians with years of experience</p>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary-200">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 to-primary-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                <DollarSign className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Affordable Pricing</h3>
              <p className="text-gray-600">Competitive rates with no hidden charges</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600 mb-3">
              How It Works
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">A simple 4-step process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting your AC serviced is easy with our simple 4-step process
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="group rounded-3xl border border-slate-200 bg-gradient-to-br from-primary-50 to-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary-200">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg shadow-primary-200 transition-transform duration-300 group-hover:scale-110">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Book a Service</h3>
              <p className="text-gray-600">Schedule your AC service online or call us</p>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 to-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-sky-200">
              <div className="w-16 h-16 bg-sky-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg shadow-sky-200 transition-transform duration-300 group-hover:scale-110">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">We Confirm</h3>
              <p className="text-gray-600">We confirm your appointment and technician details</p>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-50 to-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-cyan-200">
              <div className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg shadow-cyan-200 transition-transform duration-300 group-hover:scale-110">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Technician Visits</h3>
              <p className="text-gray-600">Our expert technician arrives at your location</p>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-gradient-to-br from-primary-50 to-sky-50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary-200">
              <div className="w-16 h-16 bg-primary-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg shadow-primary-200 transition-transform duration-300 group-hover:scale-110">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Service Complete</h3>
              <p className="text-gray-600">Your AC is serviced and running perfectly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review._id} className="card">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{review.comment}"</p>
                  <p className="font-semibold text-gray-900">- {review.user.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need AC Repair or Installation?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Get professional AC services today. Fast, reliable, and affordable.
          </p>
          <Link to="/booking" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Book a Service Now
          </Link>
        </div>
      </section>

      <a
        href="https://wa.me/0771754835"
        target="_blank"
        rel="noreferrer"
        aria-label="Contact us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1ebe5d]"
      >
        <MessageCircle className="h-10 w-10" />
           WhatsApp
      </a>

    </div>
  );
};

export default Home;
