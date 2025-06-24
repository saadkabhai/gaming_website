import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect('mongodb+srv://saadmajid031:ezKJVOjLN40VAeEd@vendor-app.1rg4rb1.mongodb.net/GamingWebsite', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};
