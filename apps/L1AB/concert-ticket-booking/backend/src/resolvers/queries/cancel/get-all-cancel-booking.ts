import { QueryResolvers } from '../../../generated';
import { cancelModel, CancelPopulateType } from '../../../models';

export const getAllCancelBooking: QueryResolvers['getAllCancelBooking'] = async () => {

  const allCancel = await cancelModel.find().populate<CancelPopulateType>(['eventId', 'userId']);
  return allCancel
};
