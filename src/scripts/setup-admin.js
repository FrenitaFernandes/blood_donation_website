const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('../models/Admin');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://blood_donor:SL1ul2n6uaw0wq5x@cluster0.jtm8klw.mongodb.net/blood_donation?retryWrites=true&w=majority';

const createDefaultAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB\n');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('⚠️  Default admin already exists!');
      console.log('Username: admin');
      console.log('Password: admin123\n');
      await mongoose.connection.close();
      return;
    }

    // Create default admin
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@blooddonation.com',
      password: 'admin123',
      role: 'SuperAdmin'
    });

    console.log('✅ Default admin created successfully!\n');
    console.log('Admin Credentials:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@blooddonation.com');
    console.log('Role: SuperAdmin\n');

    await mongoose.connection.close();
    console.log('✅ Setup complete!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
};

createDefaultAdmin();
