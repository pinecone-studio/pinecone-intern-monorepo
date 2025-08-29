/* eslint max-lines: "off" */
import { GraphQLResolveInfo } from 'graphql';
import { CategoryModel } from 'src/models/category.model';
import { FoodModel } from 'src/models/food.model';
import { deleteFoodFromCategory } from 'src/resolvers/mutations';

jest.mock('src/models/category.model', () => ({
  CategoryModel: {
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

const mockCategoryModel = CategoryModel as jest.Mocked<typeof CategoryModel>;
const mockFoodModel = FoodModel as jest.Mocked<typeof FoodModel>;

describe('deletFoodFromCategory', () => {
  const mockCategoryId = '3';
  const mockFoodId = '2';
  const mockCategory = {
    _id: mockCategoryId,
    categoryName: 'Test Category',
    food: [mockFoodId],
  };
  const mockFood = {
    _id: mockFoodId,
    foodName: 'Test Food',
    price: '10',
    image: 'image.jpg',
    foodStatus: 'Идэвхитэй',
    category: mockCategoryId,
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

  it('should successfully remove food from category and return updated food', async () => {
    mockCategoryModel.findById.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue(mockUpdatedFood),
    } as any);

    mockCategoryModel.findByIdAndUpdate.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findByIdAndUpdate.mockResolvedValueOnce(mockFood);

    const result = await deleteFoodFromCategory?.(
      {},
      {
        categoryId: mockCategoryId,
        foodId: mockFoodId,
      },
      {},
      {} as GraphQLResolveInfo
    );

    expect(mockCategoryModel.findById).toHaveBeenCalledWith(mockCategoryId);
    expect(mockFoodModel.findById).toHaveBeenCalledWith(mockFoodId);

    expect(mockCategoryModel.findByIdAndUpdate).toHaveBeenCalledWith(mockCategoryId, { $pull: { food: mockFoodId } });
    expect(mockFoodModel.findByIdAndUpdate).toHaveBeenCalledWith(mockFoodId, { $unset: { category: '' } });

    expect(mockFoodModel.findById).toHaveBeenCalledTimes(2);

    expect(result).toEqual(mockUpdatedFood);
  });

  it('should throw error when category does not exist', async () => {
    mockCategoryModel.findById.mockResolvedValueOnce(null);

    await expect(deleteFoodFromCategory?.({}, { categoryId: mockCategoryId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(`Category with ID ${mockCategoryId} not found`);

    expect(mockCategoryModel.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(mockFoodModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('should throw error when food does not exist', async () => {
    mockCategoryModel.findById.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findById.mockResolvedValueOnce(null);

    await expect(deleteFoodFromCategory?.({}, { categoryId: mockCategoryId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(`Food with ID ${mockFoodId} not found`);

    expect(mockCategoryModel.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(mockFoodModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('should throw error when category update fails', async () => {
    mockCategoryModel.findById.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood);

    mockCategoryModel.findByIdAndUpdate.mockRejectedValueOnce(new Error('Database error'));

    await expect(deleteFoodFromCategory?.({}, { categoryId: mockCategoryId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to remove food');
  });

  it('should throw error when food update fails', async () => {
    mockCategoryModel.findById.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood);
    mockCategoryModel.findByIdAndUpdate.mockResolvedValueOnce(mockCategory);

    mockFoodModel.findByIdAndUpdate.mockRejectedValueOnce(new Error('Database error'));

    await expect(deleteFoodFromCategory?.({}, { categoryId: mockCategoryId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to remove food');
  });

  it('should throw error when populate fails', async () => {
    mockCategoryModel.findById.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood);
    mockCategoryModel.findByIdAndUpdate.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findByIdAndUpdate.mockResolvedValueOnce(mockFood);

    mockFoodModel.findById.mockReturnValueOnce({
      populate: jest.fn().mockRejectedValue(new Error('Populate error')),
    } as any);

    await expect(deleteFoodFromCategory?.({}, { categoryId: mockCategoryId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to remove food');
  });

  it('should return null when updated food is not found', async () => {
    mockCategoryModel.findById.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood);
    mockCategoryModel.findByIdAndUpdate.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findByIdAndUpdate.mockResolvedValueOnce(mockFood);

    mockFoodModel.findById.mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue(null),
    } as any);

    const result = await deleteFoodFromCategory?.({}, { categoryId: mockCategoryId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo);

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

    mockCategoryModel.findById.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue(mockFoodWithPopulatedData),
    } as any);

    mockCategoryModel.findByIdAndUpdate.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findByIdAndUpdate.mockResolvedValueOnce(mockFood);

    const result = await deleteFoodFromCategory?.({}, { categoryId: mockCategoryId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(mockFoodWithPopulatedData);

    const mockPopulate = (mockFoodModel.findById as jest.Mock).mock.results[1].value.populate;
    expect(mockPopulate).toHaveBeenCalledWith(['category', 'discount']);
  });
});
