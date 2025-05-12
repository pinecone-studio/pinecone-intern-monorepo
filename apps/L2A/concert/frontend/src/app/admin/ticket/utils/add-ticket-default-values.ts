import z from 'zod';
import { AddTicketSchema } from './add-ticket-schema';

export const AddTicketDefaultValues: z.infer<typeof AddTicketSchema> = {
  title: '',
  description: '',
  thumbnailUrl: '',
  musicStart: String(Date.now()),
  venueName: '',
  venueAddress: '',
  venueCity: 'Улаанбаатар',
  venueCapacity: 0,
  artistName: '',
  startDate: String(Date.now()),
  endDate: String(Date.now()),
  AvialableTicketCountBackSeat: 0,
  AvialableTicketCountStandard: 0,
  AvialableTicketCountVIP: 0,
  VIPTicketPrice: 1000,
  BackSeatTicketPrice: 1000,
  StandardTicketPrice: 1000,
};
