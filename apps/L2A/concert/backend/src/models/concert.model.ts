import { model, models, Schema } from 'mongoose';
import { Concert } from '../generated';

const concertSchema = new Schema<Concert>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    doorOpen: { type: String, required: true },
    musicStart: { type: String, required: true },
    venue: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    artistName: { type: String, required: true },
    specialGuestName: { type: String },
    seatData: [{ type: Schema.Types.ObjectId, ref: 'Seat' }],
    endDate: { type: String, required: true },
  },
  { timestamps: true }
);

export const concertModel = models.Concert || model<Concert>('Concert', concertSchema);
