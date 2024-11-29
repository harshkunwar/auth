const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user', // Default role is 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define Session Schema
const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1h', // Session expires after 1 hour
  },
});

// Create Models
const User = mongoose.model('User', userSchema);
const Session = mongoose.model('Session', sessionSchema);

// Export Models
module.exports = { User, Session };
