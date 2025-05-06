import dayjs from 'dayjs';
import { Types } from 'mongoose';
import { MutationResolvers } from '../../generated';
import { concertModel } from '../../models/concert.model';

export const createConcert: MutationResolvers['createConcert'] = async (_, { input }) => {
  const { title, description, thumbnailUrl, doorOpen, musicStart, venue, artistName, specialGuestName, seatData, endDate } = input;

  const startDate = seatData[0].date;
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const daysCount = end.diff(start, 'day') + 1;

  const generatedSeatData = Array.from({ length: daysCount }, (_, i) => {
    const date = start.add(i, 'day').format('YYYY-MM-DD');
    return {
      date,
      seats: {
        VIP: {
          price: seatData[0].seats.VIP.price,
          availableTickets: seatData[0].seats.VIP.availableTickets,
        },
        Standard: {
          price: seatData[0].seats.Standard.price,
          availableTickets: seatData[0].seats.Standard.availableTickets,
        },
        Backseat: {
          price: seatData[0].seats.Backseat.price,
          availableTickets: seatData[0].seats.Backseat.availableTickets,
        },
      },
    };
  });

  const newConcert = new concertModel({
    title,
    description: description ?? undefined,
    thumbnailUrl: thumbnailUrl ?? undefined,
    doorOpen,
    musicStart,
    venue: new Types.ObjectId(venue),
    artistName,
    specialGuestName: specialGuestName ?? undefined,
    seatData: generatedSeatData,
    endDate: endDate,
  });

  const savedConcert = await newConcert.save();
  return savedConcert;
};
