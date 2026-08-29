import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import logo from '../assets/logo_only.png';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-secondary-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Metro Cool Engineering Logo" className="h-16 w-16" />
            <span className="text-xl font-bold">Metro Cool Engineering</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-primary-400 transition-colors">About</Link>
            <Link to="/services" className="hover:text-primary-400 transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link>
            <a href="tel:+94771754835" className="flex items-center gap-2 font-semibold hover:text-primary-400 transition-colors">
              <Phone className="h-4 w-4" />
              +94 (077) 175 4835
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-secondary-800 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-secondary-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:text-primary-400 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="block py-2 hover:text-primary-400 transition-colors" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/services" className="block py-2 hover:text-primary-400 transition-colors" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/contact" className="block py-2 hover:text-primary-400 transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
            <a href="tel:+15551234567" className="flex items-center gap-2 py-2 font-semibold hover:text-primary-400 transition-colors">
              <Phone className="h-4 w-4" />
              +1 (555) 123-4567
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
