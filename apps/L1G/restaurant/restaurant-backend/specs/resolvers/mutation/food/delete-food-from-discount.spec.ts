/* eslint max-lines: "off" */
import { GraphQLResolveInfo } from 'graphql';
import { DiscountModel } from 'src/models/discount.model';
import { FoodModel } from 'src/models/food.model';
import { deleteFoodFromDiscount } from 'src/resolvers/mutations';

jest.mock('src/models/discount.model', () => ({
  DiscountModel: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

const mockDiscountModel = DiscountModel as jest.Mocked<typeof DiscountModel>;
const mockFoodModel = FoodModel as jest.Mocked<typeof FoodModel>;

describe('deletFoodFromDiscount', () => {
  const mockDiscountId = '3';
  const mockFoodId = '2';
  const mockDiscount = {
    _id: mockDiscountId,
    discountNameName: 'Test Discount',
    food: [mockFoodId],
  };
  const mockFood = {
    _id: mockFoodId,
    foodName: 'Test Food',
    price: '10',
    image: 'image.jpg',
    foodStatus: 'Идэвхитэй',
    discount: mockDiscountId,
  };
  const mockUpdatedFood = {
    _id: mockFoodId,
    foodName: 'Test Food',
    price: '10',
    image: 'image.jpg',
    foodStatus: 'Идэвхитэй',
    category: null,
    discount: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully remove food from discount and return updated food', async () => {
    mockDiscountModel.findById.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue(mockUpdatedFood),
    } as any);

    mockDiscountModel.findByIdAndUpdate.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findByIdAndUpdate.mockResolvedValueOnce(mockFood);

    const result = await deleteFoodFromDiscount?.(
      {},
      {
        discountId: mockDiscountId,
        foodId: mockFoodId,
      },
      {},
      {} as GraphQLResolveInfo
    );

    expect(mockDiscountModel.findById).toHaveBeenCalledWith(mockDiscountId);
    expect(mockFoodModel.findById).toHaveBeenCalledWith(mockFoodId);

    expect(mockDiscountModel.findByIdAndUpdate).toHaveBeenCalledWith(mockDiscountId, { $pull: { food: mockFoodId } });
    expect(mockFoodModel.findByIdAndUpdate).toHaveBeenCalledWith(mockFoodId, { $unset: { discount: '' } });

    expect(mockFoodModel.findById).toHaveBeenCalledTimes(2);

    expect(result).toEqual(mockUpdatedFood);
  });

  it('should throw error when discount does not exist', async () => {
    mockDiscountModel.findById.mockResolvedValueOnce(null);

    await expect(deleteFoodFromDiscount?.({}, { discountId: mockDiscountId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(`Discount with ID ${mockDiscountId} not found`);

    expect(mockDiscountModel.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(mockFoodModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('should throw error when food does not exist', async () => {
    mockDiscountModel.findById.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findById.mockResolvedValueOnce(null);

    await expect(deleteFoodFromDiscount?.({}, { discountId: mockDiscountId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(`Food with ID ${mockFoodId} not found`);

    expect(mockDiscountModel.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(mockFoodModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('should throw error when discount update fails', async () => {
    mockDiscountModel.findById.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood);

    mockDiscountModel.findByIdAndUpdate.mockRejectedValueOnce(new Error('Database error'));

    await expect(deleteFoodFromDiscount?.({}, { discountId: mockDiscountId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to remove food');
  });

  it('should throw error when food update fails', async () => {
    mockDiscountModel.findById.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood);
    mockDiscountModel.findByIdAndUpdate.mockResolvedValueOnce(mockDiscount);

    mockFoodModel.findByIdAndUpdate.mockRejectedValueOnce(new Error('Database error'));

    await expect(deleteFoodFromDiscount?.({}, { discountId: mockDiscountId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to remove food');
  });

  it('should throw error when populate fails', async () => {
    mockDiscountModel.findById.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood);
    mockDiscountModel.findByIdAndUpdate.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findByIdAndUpdate.mockResolvedValueOnce(mockFood);

    mockFoodModel.findById.mockReturnValueOnce({
      populate: jest.fn().mockRejectedValue(new Error('Populate error')),
    } as any);

    await expect(deleteFoodFromDiscount?.({}, { discountId: mockDiscountId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to remove food');
  });

  it('should return null when updated food is not found', async () => {
    mockDiscountModel.findById.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood);
    mockDiscountModel.findByIdAndUpdate.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findByIdAndUpdate.mockResolvedValueOnce(mockFood);

    mockFoodModel.findById.mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue(null),
    } as any);

    const result = await deleteFoodFromDiscount?.({}, { discountId: mockDiscountId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo);

    expect(result).toBeNull();
  });

  it('should handle successful removal with populated category and discount', async () => {
    const mockFoodWithPopulatedData = {
      ...mockUpdatedFood,
      category: {
        _id: 'other-category',
        categoryName: 'Other Category',
      },
      discount: {
        _id: 'discount1',
        percentage: 10,
      },
    };

    mockDiscountModel.findById.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue(mockFoodWithPopulatedData),
    } as any);

    mockDiscountModel.findByIdAndUpdate.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findByIdAndUpdate.mockResolvedValueOnce(mockFood);

    const result = await deleteFoodFromDiscount?.({}, { discountId: mockDiscountId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(mockFoodWithPopulatedData);

    const mockPopulate = (mockFoodModel.findById as jest.Mock).mock.results[1].value.populate;
    expect(mockPopulate).toHaveBeenCalledWith(['category', 'discount']);
  });
});
