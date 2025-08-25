import { QueryResolvers } from 'src/generated';
import { DiscountModel } from 'src/models/discount.model';
import { mapDiscount } from 'src/utils/types/discount-type';

export const getDiscounts: QueryResolvers['getDiscounts'] = async () => {
  try {
    const discounts = await DiscountModel.find();
    return discounts.map(mapDiscount);
  } catch (error) {
    throw new Error('Failed to fetch discounts');
  }
};
