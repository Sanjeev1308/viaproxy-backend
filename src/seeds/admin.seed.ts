import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectToDB } from '../config/mongoose';
import UserModel from '../models/user.model';

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectToDB();

    console.log('Connected to MongoDB');

    // Check if an admin user already exists
    const existingAdmin = await UserModel.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists. Skipping seed.');
      return;
    }

    // Create a hashed password
    const hashedPassword = await bcrypt.hash('12345678', 10);

    // Create the admin user
    const adminUser = new UserModel({
      firstName: 'Admin',
      lastName: 'Test',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      emailVerified: true,
    });

    await adminUser.save();

    console.log('Admin user seeded successfully:');
    console.log(`Email: admin@example.com`);
    console.log(`Password: 12345678`);
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();
