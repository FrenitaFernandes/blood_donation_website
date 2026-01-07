require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blood_donation';

mongoose.set('strictQuery', true);

let isConnected = false;

// Connect to MongoDB
const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    console.log('📍 Attempting to connect to MongoDB...');
    console.log('Using:', MONGO_URI);
    
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log('✅ Connected to MongoDB successfully!');
    return mongoose.connection;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('Retrying in 5 seconds...');
    isConnected = false;
    
    // Retry after 5 seconds
    setTimeout(() => {
      connectDB().catch(console.error);
    }, 5000);
    
    throw err;
  }
};

module.exports = { mongoose, connectDB };

