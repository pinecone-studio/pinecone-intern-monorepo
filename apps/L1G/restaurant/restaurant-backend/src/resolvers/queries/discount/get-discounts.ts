import { QueryResolvers } from 'src/generated';
import { DiscountModel } from 'src/models/discount.model';

export const getDiscounts: QueryResolvers['getDiscounts'] = async () => {
  try {
    const discounts = await DiscountModel.find();
    return discounts;
  } catch (error) {
    throw new Error('Failed to fetch discounts');
  }
};
