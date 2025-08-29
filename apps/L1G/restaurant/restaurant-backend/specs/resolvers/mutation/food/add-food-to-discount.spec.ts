import { GraphQLResolveInfo } from 'graphql';
import { DiscountModel } from 'src/models/discount.model';
import { FoodModel } from 'src/models/food.model';
import { addFoodToDiscount } from 'src/resolvers/mutations';

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

describe('addFoodToDiscount', () => {
  const mockDiscountId = '3';
  const mockFoodId = '2';
  const mockDiscount = {
    _id: mockDiscountId,
    discountName: 'Test1',
    food: [],
  };
  const mockFood = {
    _id: mockFoodId,
    foodName: 'Test',
    price: '10',
    image: 'image.jpg',
    foodStatus: 'Идэвхитэй',
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully add food to category and return food array', async () => {
    mockDiscountModel.findById.mockResolvedValueOnce(mockDiscount).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue({
        ...mockDiscount,
        food: [mockFood],
      }),
    } as any);

    mockFoodModel.findById.mockResolvedValueOnce(mockFood);

    mockDiscountModel.findByIdAndUpdate.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findByIdAndUpdate.mockResolvedValueOnce(mockFood);

    const result = await addFoodToDiscount?.(
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

    expect(mockDiscountModel.findByIdAndUpdate).toHaveBeenCalledWith(mockDiscountId, { $addToSet: { food: mockFoodId } });
    expect(mockFoodModel.findByIdAndUpdate).toHaveBeenCalledWith(mockFoodId, { discount: mockDiscountId });

    expect(result).toEqual([mockFood]);
  });

  it('should throw error when category does not exist', async () => {
    mockDiscountModel.findById.mockResolvedValueOnce(null);

    await expect(addFoodToDiscount?.({}, { discountId: mockDiscountId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(`Discount with ID ${mockDiscountId} not found`);

    expect(mockDiscountModel.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(mockFoodModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('should throw error when food does not exist', async () => {
    mockDiscountModel.findById.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findById.mockResolvedValueOnce(null);

    await expect(addFoodToDiscount?.({}, { discountId: mockDiscountId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(`Food with ID ${mockFoodId} not found`);

    expect(mockDiscountModel.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(mockFoodModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('should throw error when database operation fails', async () => {
    mockDiscountModel.findById.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood);

    mockDiscountModel.findByIdAndUpdate.mockRejectedValueOnce(new Error('Database error'));

    await expect(addFoodToDiscount?.({}, { discountId: mockDiscountId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to add food');
  });

  it('should return empty array when updated category has no food', async () => {
    mockDiscountModel.findById.mockResolvedValueOnce(mockDiscount).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue(null),
    } as any);

    mockFoodModel.findById.mockResolvedValueOnce(mockFood);

    mockDiscountModel.findByIdAndUpdate.mockResolvedValueOnce(mockDiscount);
    mockFoodModel.findByIdAndUpdate.mockResolvedValueOnce(mockFood);

    const result = await addFoodToDiscount?.({}, { discountId: mockDiscountId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual([]);
  });
});
