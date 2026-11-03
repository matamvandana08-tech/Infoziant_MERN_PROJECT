require('dotenv').config();
const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
const connectDB = require('./config/db');

const seedDoctors = async () => {
  try {
    await connectDB();

    const doctors = [
      {
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@docconnect.com',
        password: 'doctor123',
        phone: '9876543210',
        specialization: 'General Physician',
        experience: 10,
        qualification: 'MBBS, MD',
        isApproved: true,
        approvalStatus: 'approved',
        isActive: true
      },
      {
        name: 'Dr. Michael Chen',
        email: 'michael.chen@docconnect.com',
        password: 'doctor123',
        phone: '9876543211',
        specialization: 'Cardiologist',
        experience: 15,
        qualification: 'MBBS, MD (Cardiology)',
        isApproved: true,
        approvalStatus: 'approved',
        isActive: true
      },
      {
        name: 'Dr. Emily Williams',
        email: 'emily.williams@docconnect.com',
        password: 'doctor123',
        phone: '9876543212',
        specialization: 'Dermatologist',
        experience: 8,
        qualification: 'MBBS, MD (Dermatology)',
        isApproved: true,
        approvalStatus: 'approved',
        isActive: true
      },
      {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@docconnect.com',
        password: 'doctor123',
        phone: '9876543213',
        specialization: 'Orthopedic Surgeon',
        experience: 12,
        qualification: 'MBBS, MS (Orthopedics)',
        isApproved: true,
        approvalStatus: 'approved',
        isActive: true
      },
      {
        name: 'Dr. Priya Sharma',
        email: 'priya.sharma@docconnect.com',
        password: 'doctor123',
        phone: '9876543214',
        specialization: 'Pediatrician',
        experience: 7,
        qualification: 'MBBS, MD (Pediatrics)',
        isApproved: true,
        approvalStatus: 'approved',
        isActive: true
      }
    ];

    const existingCount = await Doctor.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing doctors. Skipping seed.`);
      return;
    }

    await Doctor.insertMany(doctors);
    console.log(`Successfully seeded ${doctors.length} doctors into the database.`);
    console.log('Doctors can now log in with their email and password (doctor123)');
  } catch (error) {
    console.error('Seeding doctors failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedDoctors();
