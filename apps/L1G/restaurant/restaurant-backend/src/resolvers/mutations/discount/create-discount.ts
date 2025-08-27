import { MutationResolvers } from 'src/generated';
import { DiscountModel } from 'src/models/discount.model';

export const createDiscount: MutationResolvers['createDiscount'] = async (_, { input: { discountName, discountRate, startDate, endDate } }) => {
  try {
    const newDiscount = await DiscountModel.create({ discountName, discountRate, startDate, endDate });

    return newDiscount;
  } catch (error) {
    throw new Error('Failed to create discount');
  }
};
