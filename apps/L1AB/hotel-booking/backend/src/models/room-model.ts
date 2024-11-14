import mongoose, { model, Schema } from 'mongoose';

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roomNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photos: [
      {
        type: String,
      },
    ],
    roomType: {
      type: String,
      enum: ['ONE', 'TWO'],
      required: true,
    },
    hotelId: {
      type: Schema.ObjectId,
      ref: 'hotel',
      required: true,
    },
  },
  { timestamps: true }
);

export const roomModel = mongoose.models.room || model('room', roomSchema);
