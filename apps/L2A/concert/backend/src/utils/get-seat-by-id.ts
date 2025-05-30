import { SeatData } from '../generated';
import { seatModel } from '../models';

export const findSeatById = async (id: string): Promise<SeatData> => {
  const seatData = await seatModel.findById(id);
  if (!seatData) throw new Error('Seat data not found');
  return seatData;
};
