import { model, models, Schema } from 'mongoose';
import { SeatCategories, SeatData, SeatInfo } from '../generated';

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

export const seatModel = models.Seat || model('Seat', SeatDataSchema);
