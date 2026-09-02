import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gauge, Settings, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import api from '../services/api';

import pic1 from '../assets/Ac_install.jpg';
import pic2 from '/src/assets/Ac_repair.jpg';
import pic3 from '../assets/Ac_gas_refill.jpg';
import pic4 from '../assets/Ac_maintenance.jpg';
import pic5 from '../assets/Ac_cleaning.jpg';
import pic6 from '../assets/Ac_trouble.jpg';

const serviceCatalog = [
  {
    name: 'AC Installation',
    description: 'Professional installation for homes and businesses, set up for reliable and energy-efficient cooling.',
    image: pic1,
    icon: Settings,
  },
  {
    name: 'AC Repair',
    description: 'Fast diagnosis and dependable repairs for cooling problems, electrical faults, leaks, and unusual noise.',
    image: pic2,
    icon: Wrench,
  },
  {
    name: 'Gas Refilling',
    description: 'Refrigerant checks, leak detection, and gas refilling to restore your AC\'s cooling performance.',
    image: pic3,
    icon: Gauge,
  },
  {
    name: 'AC Maintenance',
    description: 'Routine care and tune-ups that keep your AC efficient, reliable, and long lasting.',
    image: pic4,
    icon: ShieldCheck,
  },
  {
    name: 'Inspection & Cleaning',
    description: 'Thorough inspection and deep cleaning to improve airflow, efficiency, and air quality.',
    image: pic5,
    icon: Sparkles,
  },
  {
    name: 'Troubleshooting',
    description: 'Expert diagnosis and resolution of complex AC issues to get your system back to optimal performance.',
    image: pic6,
    icon: Wrench,
  }
];

const getPrimaryServiceMeta = (serviceName = '') => {
  const normalizedName = serviceName.toLowerCase();

  if (normalizedName.includes('install')) return serviceCatalog[0];
  if (normalizedName.includes('repair')) return serviceCatalog[1];
  if (normalizedName.includes('gas') || normalizedName.includes('refill')) return serviceCatalog[2];
  if (normalizedName.includes('maint')) return serviceCatalog[3];
  if (normalizedName.includes('clean') || normalizedName.includes('inspect')) return serviceCatalog[4];
  if (normalizedName.includes('trouble')) return serviceCatalog[5];
  return {
    name: serviceName || 'Professional Service',
    description: 'Expert AC support tailored to your home or business needs.',
    image: pic1,
    icon: ShieldCheck,
  };
};

export const ServicesGrid = ({
  title = 'Our Services',
  subtitle = 'We offer comprehensive AC services to keep your cooling systems running efficiently',
  showViewAll = false,
  limit = null,
}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        const allServices = response.data.data || [];

        const preferredServices = allServices.filter((service) => {
          const name = service.name?.toLowerCase() || '';
          return (
            name.includes('install') ||
            name.includes('repair') ||
            name.includes('gas') ||
            name.includes('refill') ||
            name.includes('maint') ||
            name.includes('clean') ||
            name.includes('inspect') ||
            name.includes('trouble')
          );
        });

        setServices(preferredServices.length > 0 ? preferredServices : allServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const displayServices = limit !== null ? services.slice(0, limit) : services;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="group min-h-[290px] rounded-xl border border-gray-200 bg-white p-7 shadow-sm animate-pulse">
                <div className="mb-6 h-14 w-14 rounded-lg bg-gray-200" />
                <div className="mb-3 h-6 w-32 rounded bg-gray-200" />
                <div className="mb-6 h-20 rounded bg-gray-200" />
                <div className="h-5 w-28 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : displayServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {displayServices.map((service) => {
              const meta = getPrimaryServiceMeta(service.name);
              const Icon = meta.icon;
              const imageUrl = service.image || meta.image;

              return (
                <article
                  key={service._id}
                  className="group flex min-h-[290px] flex-col overflow-hidden border border-gray-200 bg-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:border-primary-400 hover:shadow-lg"
                >
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={service.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-gray-900">{service.name}</h3>
                    <p className="mb-6 flex-grow leading-7 text-gray-600">
                      {service.shortDescription || meta.description}
                    </p>
                    <Link
                      to={service._id ? `/services/${service._id}` : '/services'}
                      className="inline-flex items-center font-semibold text-primary-600 transition-colors hover:text-primary-700"
                    >
                      View Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {showViewAll && (
          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <div>
      <section className="bg-secondary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive AC services for residential and commercial needs
          </p>
        </div>
      </section>

      <ServicesGrid
        title="Our Services"
        subtitle="We offer comprehensive AC services to keep your cooling systems running efficiently"
        showViewAll={false}
      />

      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book a Service?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Get your AC serviced by our expert technicians today
          </p>
          <Link to="/booking" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
