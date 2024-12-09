import mongoose, { Schema, Types, model } from 'mongoose';
import { RoomType } from '../generated';

export type bookingType = {
  _id: string;
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roomId: Types.ObjectId;
  status: string;
  traveller: number;
  checkIn: Date;
  checkOut: Date;
  createdAt: Date;
  updatedAt: Date;
};

const bookingSchema = new Schema<bookingType>(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
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

export type bookingPopulatedType = {
  roomId: RoomType;
};

export const bookingModel = mongoose.models.booking || model('booking', bookingSchema);
