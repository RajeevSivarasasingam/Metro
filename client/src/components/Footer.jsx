import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Metro Cool Engineering</h3>
            <p className="text-gray-400 mb-4">
              Professional AC repair, installation, and maintenance services for homes and businesses.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-primary-400 cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-primary-400 cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-primary-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary-400 transition-colors">Services</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>AC Repair</li>
              <li>AC Installation</li>
              <li>AC Maintenance</li>
              <li>AC Cleaning</li>
              <li>Gas Refilling</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5 text-primary-400" />
                <span>+94 (077) 175 4835</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 text-primary-400" />
                <span>metrocoolengineer@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 text-primary-400 mt-1" />
                <span>123 Cool Street, HVAC City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Metro Cool Engineering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
