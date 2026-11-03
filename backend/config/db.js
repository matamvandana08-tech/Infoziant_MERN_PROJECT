const dns = require('dns');
const mongoose = require('mongoose');

// Configure public DNS servers fallback to prevent querySrv ECONNREFUSED on restrictive networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore in sandboxed environments where setServers is restricted
}

const getMongoUri = () => {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error('MONGODB_URI is required. Configure the MongoDB Atlas connection in backend/.env.');
  }

  let parsedUri;
  try {
    parsedUri = new URL(uri);
  } catch {
    throw new Error('MONGODB_URI must be a valid MongoDB Atlas connection string.');
  }

  if (
    !['mongodb:', 'mongodb+srv:'].includes(parsedUri.protocol)
  ) {
    throw new Error('MONGODB_URI must be a valid MongoDB connection string.');
  }

  return uri;
};

const connectDB = async () => {
  const uri = getMongoUri();
  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB?.trim() || 'docconnect'
    });
    console.log(`MongoDB connected successfully (${mongoose.connection.host})`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message.replace(uri, '[redacted MongoDB URI]'));
    throw error;
  }
};

module.exports = connectDB;
module.exports.getMongoUri = getMongoUri;
