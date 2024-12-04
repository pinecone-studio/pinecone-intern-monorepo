import { model, models, Schema, Types } from 'mongoose';
import { UserType } from './user-model';
import { EventType } from './event-model';

export type BookingType = {
  _id: string;
  eventId: Types.ObjectId;
  bankName: string;
  bankAccount: number;
  bankAccountName: string;
  userId: Types.ObjectId;
  amountTotal: number;
  status: string;
  email: string;
  phone: string;
  selectedDate: string;
  venues: [
    {
      name: string;
      quantity: number;
      price: number;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
};

const BookingSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'event',
    required: true,
  },
  bankName: {
    type: String,
    default: '',
    required: false,
  },
  bankAccount: {
    type: Number,
    default: '',
    required: false,
  },
  bankAccountName: {
    type: String,
    default: '',
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  amountTotal: {
    type: Number,
    default: '',
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: 'Баталгаажаагүй',
    enum: ['Баталгаажаагүй', 'Төлбөр хүлээгдэж буй', 'Баталгаажсан', 'Цуцлах хүсэлт илгээсэн', 'Цуцлагдсан'],
  },
  email: {
    type: String,
    required: false,
    default: '',
  },
  phone: {
    type: String,
    required: false,
    default: '',
  },
  selectedDate: {
    type: String,
    required: false,
  },
  venues: [
    {
      name: {
        type: String,
        required: false,
        default: 'VIP',
      },
      quantity: {
        type: Number,
        required: false,
        default: 0,
      },
      price: {
        type: Number,
        required: false,
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
export type BookingPopulateType = BookingType & {
  userId: UserType;
  eventId: EventType;
};

export const bookingModel = models['booking'] || model('booking', BookingSchema);
