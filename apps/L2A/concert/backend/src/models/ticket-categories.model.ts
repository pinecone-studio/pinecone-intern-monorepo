import { models, model, Schema } from 'mongoose';
import { TicketType } from '../generated';

const ticketCategoriesSchema = new Schema({
  type: { type: TicketType, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
});

export const ticketCategorieModel = models.ticketCategories || model('ticketCategories', ticketCategoriesSchema);
