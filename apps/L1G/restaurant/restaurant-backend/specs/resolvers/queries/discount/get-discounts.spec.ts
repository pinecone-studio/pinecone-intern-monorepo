import { GraphQLResolveInfo } from 'graphql';
import { DiscountModel } from 'src/models/discount.model';
import { getDiscounts } from 'src/resolvers/queries';

jest.mock('src/models/discount.model', () => ({
  DiscountModel: {
    find: jest.fn(),
  },
}));

describe('getDiscounts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return discounts', async () => {
    (DiscountModel.find as jest.Mock).mockResolvedValue([
      {
        _id: '1',
        discountName: 'Test',
        discountRate: 0.15,
        startDate: new Date(),
        endDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const result = await getDiscounts?.({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      expect.objectContaining({
        discountId: '1',
        discountName: 'Test',
        discountRate: 0.15,
      }),
    ]);
    expect(DiscountModel.find).toHaveBeenCalledTimes(1);
  });

  it('should handle database errors', async () => {
    (DiscountModel.find as jest.Mock).mockRejectedValue(new Error('Failed to fetch discounts'));

    await expect(getDiscounts?.({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to fetch discounts');
  });
});
