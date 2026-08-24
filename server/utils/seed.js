require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Service = require('../models/Service');
const Technician = require('../models/Technician');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const ContactMessage = require('../models/ContactMessage');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    await Technician.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});
    await ContactMessage.deleteMany({});
    console.log('Cleared existing data');

    // Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@metrocool.com',
      phone: '+1 (555) 000-0001',
      password: adminPassword,
      role: 'admin',
      address: '123 Admin Street, HVAC City, TC 12345',
    });
    console.log('Created admin user:', admin.email);

    // Create Sample Customers
    const customerPassword = await bcrypt.hash('customer123', 10);
    const customer1 = await User.create({
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      password: customerPassword,
      role: 'customer',
      address: '456 Oak Avenue, Metro City, MC 12345',
    });
    console.log('Created customer:', customer1.email);

    const customer2 = await User.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+1 (555) 987-6543',
      password: customerPassword,
      role: 'customer',
      address: '789 Pine Road, Cool Town, CT 67890',
    });
    console.log('Created customer:', customer2.email);

    // Create Services
    const services = await Service.create([
      {
        name: 'AC Repair',
        shortDescription: 'Professional AC repair services for all types of air conditioning units',
        description: 'Our expert technicians provide comprehensive AC repair services for split AC, window AC, central AC, and cassette AC systems. We diagnose and fix all types of AC problems including cooling issues, noise problems, refrigerant leaks, and electrical faults.',
        image: '',
        features: [
          'Expert diagnosis',
          'Quality parts',
          'Warranty on repairs',
          'Same-day service available',
          'Affordable pricing',
        ],
        isActive: true,
      },
      {
        name: 'AC Installation',
        shortDescription: 'Professional AC installation for residential and commercial spaces',
        description: 'We provide professional AC installation services for new air conditioning units. Our technicians ensure proper installation according to manufacturer specifications for optimal performance and energy efficiency.',
        image: '',
        features: [
          'Professional installation',
          'Site assessment',
          'Proper sizing',
          'Energy-efficient setup',
          'Post-installation testing',
        ],
        isActive: true,
      },
      {
        name: 'AC Maintenance',
        shortDescription: 'Regular AC maintenance to keep your system running efficiently',
        description: 'Regular maintenance is essential for optimal AC performance and longevity. Our maintenance services include cleaning, inspection, and tune-up of your air conditioning system to prevent breakdowns and improve efficiency.',
        image: '',
        features: [
          'Comprehensive cleaning',
          'Filter replacement',
          'Coil cleaning',
          'Performance check',
          'Preventive maintenance',
        ],
        isActive: true,
      },
      {
        name: 'AC Cleaning',
        shortDescription: 'Deep cleaning services for your air conditioning system',
        description: 'Our AC cleaning service includes thorough cleaning of indoor and outdoor units, filters, coils, and drainage systems. Clean AC units perform better, consume less energy, and provide better air quality.',
        image: '',
        features: [
          'Indoor unit cleaning',
          'Outdoor unit cleaning',
          'Filter cleaning',
          'Drainage cleaning',
          'Sanitization',
        ],
        isActive: true,
      },
      {
        name: 'AC Gas Refilling',
        shortDescription: 'Refrigerant gas refilling and leak detection services',
        description: 'If your AC is not cooling properly, it might be low on refrigerant. We provide gas refilling services with proper leak detection and repair to ensure your AC operates at peak efficiency.',
        image: '',
        features: [
          'Gas level check',
          'Leak detection',
          'Gas refilling',
          'Pressure testing',
          'Performance optimization',
        ],
        isActive: true,
      },
      {
        name: 'AC Troubleshooting',
        shortDescription: 'Expert AC troubleshooting and diagnosis services',
        description: 'Not sure what\'s wrong with your AC? Our technicians provide comprehensive troubleshooting services to identify and resolve any issues with your air conditioning system.',
        image: '',
        features: [
          'Complete diagnosis',
          'Problem identification',
          'Solution recommendation',
          'Cost estimate',
          'Expert advice',
        ],
        isActive: true,
      },
      {
        name: 'Commercial AC Services',
        shortDescription: 'Specialized AC services for commercial and industrial spaces',
        description: 'We offer comprehensive AC services for commercial establishments including offices, restaurants, retail stores, and industrial facilities. Our team is equipped to handle large-scale AC systems.',
        image: '',
        features: [
          'Commercial expertise',
          'Large system handling',
          'Maintenance contracts',
          'Emergency service',
          'Customized solutions',
        ],
        isActive: true,
      },
    ]);
    console.log(`Created ${services.length} services`);

    // Create Technicians
    const technicians = await Technician.create([
      {
        name: 'Mike Johnson',
        email: 'mike.johnson@metrocool.com',
        phone: '+1 (555) 111-2222',
        specialization: 'AC Repair',
        experience: '8 years',
        availability: 'Available',
        status: 'Available',
      },
      {
        name: 'Sarah Williams',
        email: 'sarah.williams@metrocool.com',
        phone: '+1 (555) 333-4444',
        specialization: 'AC Installation',
        experience: '5 years',
        availability: 'Available',
        status: 'Available',
      },
      {
        name: 'David Brown',
        email: 'david.brown@metrocool.com',
        phone: '+1 (555) 555-6666',
        specialization: 'AC Maintenance',
        experience: '10 years',
        availability: 'Available',
        status: 'Available',
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@metrocool.com',
        phone: '+1 (555) 777-8888',
        specialization: 'Commercial AC',
        experience: '12 years',
        availability: 'Available',
        status: 'Available',
      },
    ]);
    console.log(`Created ${technicians.length} technicians`);

    // Create Sample Bookings
    const bookings = await Booking.create([
      {
        user: customer1._id,
        customerName: customer1.name,
        phone: customer1.phone,
        email: customer1.email,
        service: services[0]._id,
        acType: 'Split AC',
        acBrand: 'Daikin',
        problemDescription: 'AC not cooling properly, making unusual noise',
        address: customer1.address,
        preferredDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        preferredTime: '10:00 AM - 12:00 PM',
        technician: technicians[0]._id,
        status: 'Assigned',
        notes: 'Customer mentioned the issue started last week',
      },
      {
        user: customer2._id,
        customerName: customer2.name,
        phone: customer2.phone,
        email: customer2.email,
        service: services[1]._id,
        acType: 'Window AC',
        acBrand: 'LG',
        problemDescription: 'Need new AC installation in bedroom',
        address: customer2.address,
        preferredDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        preferredTime: '2:00 PM - 4:00 PM',
        technician: technicians[1]._id,
        status: 'Confirmed',
        notes: 'Customer wants 1.5 ton AC',
      },
      {
        user: customer1._id,
        customerName: customer1.name,
        phone: customer1.phone,
        email: customer1.email,
        service: services[2]._id,
        acType: 'Split AC',
        acBrand: 'Samsung',
        problemDescription: 'Annual maintenance service',
        address: customer1.address,
        preferredDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        preferredTime: '8:00 AM - 10:00 AM',
        technician: technicians[2]._id,
        status: 'Completed',
        notes: 'Regular maintenance completed successfully',
      },
      {
        user: customer2._id,
        customerName: customer2.name,
        phone: customer2.phone,
        email: customer2.email,
        service: services[3]._id,
        acType: 'Central AC',
        acBrand: 'Carrier',
        problemDescription: 'AC needs deep cleaning',
        address: customer2.address,
        preferredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        preferredTime: '12:00 PM - 2:00 PM',
        technician: null,
        status: 'Pending',
        notes: '',
      },
    ]);
    console.log(`Created ${bookings.length} bookings`);

    // Create Sample Reviews
    const reviews = await Review.create([
      {
        user: customer1._id,
        booking: bookings[2]._id,
        rating: 5,
        comment: 'Excellent service! The technician was very professional and knowledgeable. My AC is working perfectly now.',
        isApproved: true,
      },
      {
        user: customer2._id,
        booking: bookings[2]._id,
        rating: 4,
        comment: 'Good service overall. The technician arrived on time and completed the work efficiently.',
        isApproved: true,
      },
    ]);
    console.log(`Created ${reviews.length} reviews`);

    // Create Sample Contact Messages
    const messages = await ContactMessage.create([
      {
        name: 'Robert Wilson',
        email: 'robert.wilson@example.com',
        phone: '+1 (555) 999-8888',
        subject: 'Inquiry about commercial AC installation',
        message: 'I need a quote for installing central AC in my office building. The building is approximately 5000 sq ft.',
        status: 'New',
      },
      {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@example.com',
        phone: '+1 (555) 777-6666',
        subject: 'Question about maintenance plans',
        message: 'Do you offer annual maintenance contracts for residential AC units? If yes, what are the pricing options?',
        status: 'Read',
      },
    ]);
    console.log(`Created ${messages.length} contact messages`);

    console.log('\n✅ Seed data created successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin Email: admin@metrocool.com');
    console.log('Admin Password: admin123');
    console.log('\nCustomer Email: john.smith@example.com');
    console.log('Customer Password: customer123');
    console.log('\nCustomer Email: jane.doe@example.com');
    console.log('Customer Password: customer123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  }
};

// Run seed
connectDB().then(() => {
  seedData();
});
