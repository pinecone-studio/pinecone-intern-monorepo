import { MutationResolvers } from 'src/generated';
import { DiscountModel } from 'src/models/discount.model';
import { mapDiscount } from 'src/utils/types/discount-type';

export const createDiscount: MutationResolvers['createDiscount'] = async (_, { input: { discountName, discountRate, startDate, endDate } }) => {
  try {
    const newDiscount = await DiscountModel.create({ discountName, discountRate, startDate, endDate });

    return mapDiscount(newDiscount);
  } catch (error) {
    throw new Error('Failed to create discount');
  }
};
