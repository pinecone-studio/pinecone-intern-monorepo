import { model, models, Schema } from 'mongoose';

export type EventType = {
  _id: string;
  name: string;
  artistName: [string];
  description: string;
  eventDate: [string];
  eventTime: [string];
  images: [string];
  status: string;
  venues: [
    {
      name: string;
      quantity: number;
      price: number;
      firstquantity: number;
    }
  ];
  discount: number;
  createdAt: Date;
  updatedAt: Date;
};

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  artistName: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventDate: {
    type: [String],
    required: true,
  },
  eventTime: {
    type: [String],
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: ['Regular', 'Онцлох', 'Deleted'],
    default: 'Regular',
  },
  venues: [
    {
      name: {
        type: String,
        required: true,
        default: 'Энгийн',
      },
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
      firstquantity: {
        type: Number,
        required: true,
        default: 0,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    {
      name: {
        type: String,
        required: true,
        default: 'Fanzone',
      },
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
      firstquantity: {
        type: Number,
        required: true,
        default: 0,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    {
      name: {
        type: String,
        required: true,
        default: 'VIP',
      },
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
      firstquantity: {
        type: Number,
        required: true,
        default: 0,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const EventModel = models['event'] || model('event', EventSchema);
