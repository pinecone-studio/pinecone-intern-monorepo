import { model, models, Schema } from 'mongoose';

type ConcertType = {
  _id: string;
  concertName: string;
  concertPlan: string;
  artistName: string[];
  concertDay: Date;
  concertTime: string;
  concertPhoto: string;
  vipTicket: { price: number; quantity: number };
  regularTicket: { price: number; quantity: number };
  standingAreaTicket: { price: number; quantity: number };
};
const concertSchema = new Schema<ConcertType>(
  {
    concertName: {
      type: String,
      required: true,
    },
    concertPlan: {
      type: String,
      required: true,
    },
    artistName: {
      type: [String],
    },
    concertDay: {
      type: Date,
      required: true,
    },
    concertTime: {
      type: String,
      required: true,
    },
    concertPhoto: {
      type: String,
    },
    vipTicket: {
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
    regularTicket: {
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
    standingAreaTicket: {
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

export const ConcertModel = models['concerts'] || model('concerts', concertSchema);
