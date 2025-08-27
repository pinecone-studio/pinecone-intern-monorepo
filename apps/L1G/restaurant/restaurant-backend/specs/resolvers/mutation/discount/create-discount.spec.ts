import { GraphQLResolveInfo } from 'graphql';
import { DiscountModel } from 'src/models/discount.model';
import { createDiscount } from 'src/resolvers/mutations';

jest.mock('src/models/discount.model', () => ({
  DiscountModel: {
    create: jest.fn(),
  },
}));

describe('createDiscount', () => {
  it('should create new discount', async () => {
    (DiscountModel.create as jest.Mock).mockReturnValue({
      discountId: '1',
      discountName: 'Test',
      discountRate: 15,
    });

    const result = await createDiscount?.({}, { input: { discountName: 'Test', discountRate: 15, startDate: '2/14/2017', endDate: '2/14/2017' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(
      expect.objectContaining({
        discountId: '1',
        discountName: 'Test',
        discountRate: 15,
      })
    );
  });

  it('should handle database errors', async () => {
    (DiscountModel.create as jest.Mock).mockRejectedValue(new Error('Failed to create discount'));

    await expect(createDiscount?.({}, { input: { discountName: 'Test', discountRate: 0.15, startDate: Date(), endDate: Date() } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow();
  });
});
