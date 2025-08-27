import { MutationResolvers } from 'src/generated';
import { DiscountModel } from 'src/models/discount.model';

export const updateDiscount: MutationResolvers['updateDiscount'] = async (_, { discountId, input: { discountName, discountRate, startDate, endDate } }) => {
  const toUpdateDiscount = await DiscountModel.findByIdAndUpdate(discountId, { $set: { discountName, discountRate, startDate, endDate } }, { new: true, runValidators: true });

  if (!toUpdateDiscount) {
    throw new Error(`Discount with ID ${discountId} not found`);
  }

  return toUpdateDiscount;
};
