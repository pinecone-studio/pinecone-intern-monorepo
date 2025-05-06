import { model, models, Schema } from 'mongoose';
import { Concert, SeatCategories, SeatData, SeatInfo } from '../generated';

const SeatInfoSchema = new Schema<SeatInfo>({
  price: { type: Number, required: true },
  availableTickets: { type: Number, required: true },
});

const SeatCategoriesSchema = new Schema<SeatCategories>({
  VIP: { type: SeatInfoSchema, required: true },
  Standard: { type: SeatInfoSchema, required: true },
  Backseat: { type: SeatInfoSchema, required: true },
});

const SeatDataSchema = new Schema<SeatData>({
  date: { type: String, required: true },
  seats: { type: SeatCategoriesSchema, required: true },
});

const concertSchema = new Schema<Concert>(
  {
    title: { type: String, required: true },
    description: { type: String },
    thumbnailUrl: { type: String },
    doorOpen: { type: String, required: true },
    musicStart: { type: String, required: true },
    venue: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    artistName: { type: String, required: true },
    specialGuestName: { type: String },
    seatData: { type: [SeatDataSchema], required: true },
    endDate: { type: String, required: true },
  },
  { timestamps: true }
);

export const concertModel = models.Concert || model<Concert>('Concert', concertSchema);
