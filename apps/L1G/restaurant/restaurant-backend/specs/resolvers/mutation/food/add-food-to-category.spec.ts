import { GraphQLResolveInfo } from 'graphql';
import { CategoryModel } from 'src/models/category.model';
import { FoodModel } from 'src/models/food.model';
import { addFoodToCategory } from 'src/resolvers/mutations';

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

describe('addFoodToCategory', () => {
  const mockCategoryId = '3';
  const mockFoodId = '2';
  const mockCategory = {
    _id: mockCategoryId,
    categoryName: 'Test1',
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
    mockCategoryModel.findById.mockResolvedValueOnce(mockCategory).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue({
        ...mockCategory,
        food: [mockFood],
      }),
    } as any);

    mockFoodModel.findById.mockResolvedValueOnce(mockFood);

    mockCategoryModel.findByIdAndUpdate.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findByIdAndUpdate.mockResolvedValueOnce(mockFood);

    const result = await addFoodToCategory?.(
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

    expect(mockCategoryModel.findByIdAndUpdate).toHaveBeenCalledWith(mockCategoryId, { $addToSet: { food: mockFoodId } });
    expect(mockFoodModel.findByIdAndUpdate).toHaveBeenCalledWith(mockFoodId, { category: mockCategoryId });

    expect(result).toEqual([mockFood]);
  });

  it('should throw error when category does not exist', async () => {
    mockCategoryModel.findById.mockResolvedValueOnce(null);

    await expect(addFoodToCategory?.({}, { categoryId: mockCategoryId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(`Category with ID ${mockCategoryId} not found`);

    expect(mockCategoryModel.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(mockFoodModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('should throw error when food does not exist', async () => {
    mockCategoryModel.findById.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findById.mockResolvedValueOnce(null);

    await expect(addFoodToCategory?.({}, { categoryId: mockCategoryId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(`Food with ID ${mockFoodId} not found`);

    expect(mockCategoryModel.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(mockFoodModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('should throw error when database operation fails', async () => {
    mockCategoryModel.findById.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findById.mockResolvedValueOnce(mockFood);

    mockCategoryModel.findByIdAndUpdate.mockRejectedValueOnce(new Error('Database error'));

    await expect(addFoodToCategory?.({}, { categoryId: mockCategoryId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to add food');
  });

  it('should return empty array when updated category has no food', async () => {
    mockCategoryModel.findById.mockResolvedValueOnce(mockCategory).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue(null),
    } as any);

    mockFoodModel.findById.mockResolvedValueOnce(mockFood);

    mockCategoryModel.findByIdAndUpdate.mockResolvedValueOnce(mockCategory);
    mockFoodModel.findByIdAndUpdate.mockResolvedValueOnce(mockFood);

    const result = await addFoodToCategory?.({}, { categoryId: mockCategoryId, foodId: mockFoodId }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual([]);
  });
});
