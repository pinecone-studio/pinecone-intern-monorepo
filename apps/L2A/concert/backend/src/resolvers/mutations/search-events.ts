import { concertModel } from '../../models';
import { catchError } from '../../utils/catch-error';
import escapeRegex from '../../utils/escape-regex';

export const searchEvents = async (_: any, { name }: { name: string }) => {
  try {
    if (!name) {
      throw new Error('Name parameter is required for searching events.');
    }
    const safeRegex = new RegExp(escapeRegex(name), 'i');
    const concerts = await concertModel.find({ title: safeRegex }).populate('venue').populate('seatData');
    return concerts;
  } catch (err) {
    return catchError(err);
  }
};
