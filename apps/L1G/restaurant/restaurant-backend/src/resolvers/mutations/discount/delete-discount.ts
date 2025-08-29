import { MutationResolvers } from 'src/generated';
import { DiscountModel } from 'src/models/discount.model';

export const deleteDiscount: MutationResolvers['deleteDiscount'] = async (_, { discountId }) => {
  const toDeleteDiscount = await DiscountModel.findByIdAndDelete(discountId);

  if (!toDeleteDiscount) {
    throw new Error(`Discount with ID ${discountId} not found`);
  }

  return toDeleteDiscount;
};
