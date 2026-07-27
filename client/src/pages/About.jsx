import React from 'react';
import { Target, Eye, Heart, Users, Award, Wrench } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Metro Cool Engineering</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your trusted partner for all air conditioning needs since 2010
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-primary-100 rounded-lg p-12 flex items-center justify-center">
                <Wrench className="h-48 w-48 text-primary-600" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-gray-600 mb-4">
                Metro Cool Engineering is a leading provider of air conditioning repair, installation, and maintenance services. With over a decade of experience, we have built a reputation for excellence, reliability, and customer satisfaction.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of certified technicians is dedicated to providing top-quality service for residential and commercial AC systems. We use the latest technology and techniques to ensure your cooling systems operate at peak efficiency.
              </p>
              <p className="text-gray-600">
                Whether you need a simple repair, a complete installation, or regular maintenance, we have the expertise to handle it all. Our commitment to quality and customer service sets us apart from the competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card">
              <div className="flex items-center mb-6">
                <Target className="h-12 w-12 text-primary-600 mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600">
                To provide exceptional air conditioning services that exceed customer expectations through quality workmanship, reliable service, and innovative solutions. We strive to be the most trusted name in AC services by consistently delivering excellence in every project we undertake.
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-6">
                <Eye className="h-12 w-12 text-primary-600 mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-600">
                To be the leading air conditioning service provider in the region, known for our commitment to quality, innovation, and customer satisfaction. We aim to expand our services while maintaining the high standards that our customers have come to expect from us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600">We prioritize our customers' needs and satisfaction above all else</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Excellence</h3>
              <p className="text-gray-600">We deliver the highest quality workmanship in every service</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Teamwork</h3>
              <p className="text-gray-600">We collaborate to provide the best solutions for our customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Customers Trust Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our track record speaks for itself
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
              <p className="text-gray-600">Years of Experience</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">5000+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
              <p className="text-gray-600">Expert Technicians</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
