import { GraphQLResolveInfo } from 'graphql';
import { DiscountModel } from 'src/models/discount.model';
import { deleteDiscount } from 'src/resolvers/mutations';

jest.mock('src/models/discount.model', () => ({
  DiscountModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('deleteDiscount', () => {
  it('should delete discount', async () => {
    (DiscountModel.findByIdAndDelete as jest.Mock).mockResolvedValue({
      discountId: '1',
      discountName: 'Test',
      discountRate: 0.15,
    });

    const result = await deleteDiscount?.({}, { discountId: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(
      expect.objectContaining({
        discountId: '1',
        discountName: 'Test',
        discountRate: 0.15,
      })
    );
  });

  it("should throw an error if the discount doesn't exist", async () => {
    (DiscountModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deleteDiscount?.({}, { discountId: '3' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Discount with ID 3 not found');

    expect(DiscountModel.findByIdAndDelete).toHaveBeenCalledWith('3');
  });
});
