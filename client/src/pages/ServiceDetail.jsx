import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Wrench, ArrowLeft, CheckCircle } from 'lucide-react';
import api from '../services/api';
import { toast } from 'sonner';

import pic1 from '../assets/Ac_install.jpg';
import pic2 from '../assets/Ac_repair.jpg';
import pic3 from '../assets/Ac_gas_refill.jpg';
import pic4 from '../assets/Ac_maintenance.jpg';
import pic5 from '../assets/Ac_cleaning.jpg';

const serviceImageMap = {
  install: pic1,
  repair: pic2,
  gas: pic3,
  refill: pic3,
  maint: pic4,
  clean: pic5,
  inspect: pic5,
};

const getServiceImage = (serviceName = '') => {
  const normalizedName = serviceName.toLowerCase();

  for (const [keyword, image] of Object.entries(serviceImageMap)) {
    if (normalizedName.includes(keyword)) {
      return image;
    }
  }

  return pic1;
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/services/${id}`);
        setService(response.data.data);
      } catch (error) {
        toast.error('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Service not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.name}</h1>
          <p className="text-xl text-gray-300">{service.shortDescription}</p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="overflow-hidden rounded-lg bg-primary-100">
                <img
                  src={service.image || getServiceImage(service.name)}
                  alt={service.name}
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Description</h2>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              {service.features && service.features.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Features</h3>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              
              <Link to="/booking" state={{ serviceId: service._id }} className="btn-primary inline-block">
                Book This Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
