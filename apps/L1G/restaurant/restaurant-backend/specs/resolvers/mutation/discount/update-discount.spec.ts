import { GraphQLResolveInfo } from 'graphql';
import { DiscountModel } from 'src/models/discount.model';
import { updateDiscount } from 'src/resolvers/mutations';

Date.now = jest.fn(() => 1487076708000);

jest.mock('src/models/discount.model', () => ({
  DiscountModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('updateDiscount', () => {
  it('should update discount', async () => {
    (DiscountModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      discountId: '2',
      discountName: 'Test',
      discountRate: 0.15,
    });

    const result = await updateDiscount?.(
      {},
      {
        discountId: '2',
        input: {
          discountName: 'Test',
          discountRate: 0.15,
          startDate: '2/14/2017',
          endDate: '2/14/2017',
        },
      },
      {},
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual(
      expect.objectContaining({
        discountId: '2',
        discountName: 'Test',
        discountRate: 0.15,
      })
    );
  });

  it('should throw an error if the discount is not found', async () => {
    (DiscountModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      updateDiscount?.({}, { discountId: '3', input: { discountName: 'Test', discountRate: 0.15, startDate: '2/14/2017', endDate: '2/14/2017' } }, {}, {} as GraphQLResolveInfo)
    ).rejects.toThrow('Discount with ID 3 not found');

    expect(DiscountModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '3',
      { $set: { discountName: 'Test', discountRate: 0.15, startDate: '2/14/2017', endDate: '2/14/2017' } },
      { new: true, runValidators: true }
    );
  });
});
