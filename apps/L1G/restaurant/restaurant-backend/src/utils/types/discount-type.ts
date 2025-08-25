import { DiscountType } from 'src/models/discount.model';

export function mapDiscount(discount: DiscountType) {
  return {
    discountId: discount._id.toString(),
    discountName: discount.discountName,
    discountRate: discount.discountRate,
    startDate: discount.startDate.toLocaleString(),
    endDate: discount.endDate.toLocaleString(),
    createdAt: discount.createdAt.toLocaleString(),
    updatedAt: discount.updatedAt.toLocaleString(),
  };
}
