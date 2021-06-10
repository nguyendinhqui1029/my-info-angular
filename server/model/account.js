let mongoose = require('mongoose');

export const accountSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  Password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: false
  },
  role: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  avatar: {
    type: Buffer,
    required: false
  }
});