import { MutationResolvers } from '../../generated';
import { concertModel } from '../../models';
import { catchError } from '../../utils/catch-error';
import escapeRegex from '../../utils/escape-regex';

export const searchEvents: MutationResolvers['searchEvents'] = async (_, { name }) => {
  try {
    if (!name) {
      throw new Error('Name parameter is required for searching events.');
    }
    const safeRegex = new RegExp(escapeRegex(name), 'i');
    const concerts = await concertModel.find({ title: safeRegex });
    return concerts;
  } catch (err) {
    return catchError(err);
  }
};
