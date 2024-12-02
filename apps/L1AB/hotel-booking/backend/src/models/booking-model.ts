import mongoose, { Schema, model } from 'mongoose';

const bookingSchema = new Schema(
  {
    roomId: {
      type: mongoose.Schema.ObjectId,
      ref: 'room',
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['booked', 'canceled', 'completed'],
      default: 'booked',
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    traveller: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const bookingModel = mongoose.models.booking || model('booking', bookingSchema);
