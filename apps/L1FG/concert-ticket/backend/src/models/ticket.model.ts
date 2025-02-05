import { model, models, Schema, Types } from 'mongoose';

type TicketType = {
  vipTicket: number;
  standartTicket: number;
  standingAreaTicket: number;
  concertID: Types.ObjectId;
  _id: Types.ObjectId;
  ticketNumber: number;
};

const ticketSchema = new Schema<TicketType>({
  vipTicket: { type: Number },
  standartTicket: { type: Number },
  standingAreaTicket: { type: Number },
  concertID: {
    type: Schema.Types.ObjectId,
    ref: 'concert',
    required: true,
  },
  ticketNumber: { type: Number, required: true },
});

export const TicketModel = models['ticket'] || model('ticket', ticketSchema);
