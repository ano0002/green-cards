const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,       // For model schema indexes
      useFindAndModify: false     // For deprecated methods
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
  
  // Close connection on process termination
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
module.exports = connectDB;