import { GraphQLResolveInfo } from 'graphql';
import { updateFoodCategory } from '../../../src/resolvers/mutations';
import { FoodModel } from '../../../src/models/food';
import { CategoryModel } from '../../../src/models/category';

jest.mock('../../../src/models/food', () => ({
  FoodModel: {
    findById: jest.fn(), // Mock findById method
  },
}));

jest.mock('../../../src/models/category', () => ({
  CategoryModel: {
    findById: jest.fn(), // Mock findById method
  },
}));

describe('updateFoodCategory Mutation', () => {
  const mockFoodId = '67874950711647af5a0c117e';
  const mockCategoryId = '67876805711647af5a0c1182';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully update the food category when valid inputs are provided', async () => {
    const mockFood = {
      _id: mockFoodId,
      foodName: 'Pizza',
      categoryId: null,
      save: jest.fn().mockResolvedValue(true),
    };

    (CategoryModel.findById as jest.Mock).mockResolvedValue({ _id: mockCategoryId, categoryName: 'Main' });
    (FoodModel.findById as jest.Mock).mockResolvedValue(mockFood);
    if (!updateFoodCategory) return;
    const result = await updateFoodCategory({}, { input: { foodId: mockFoodId, categoryId: mockCategoryId } }, {}, {} as GraphQLResolveInfo);

    expect(CategoryModel.findById).toHaveBeenCalledWith(mockCategoryId);
    expect(FoodModel.findById).toHaveBeenCalledWith(mockFoodId);
    expect(mockFood.save).toHaveBeenCalled();
    expect(result).toEqual({
      foodId: mockFoodId,
      categoryId: mockCategoryId,
    });
  });

  it('should throw an error if the category does not exist', async () => {
    (CategoryModel.findById as jest.Mock).mockResolvedValue(null);
    if (!updateFoodCategory) return;
    await expect(updateFoodCategory({}, { input: { foodId: mockFoodId, categoryId: 'invalidCategoryId' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Category not found');

    expect(CategoryModel.findById).toHaveBeenCalledWith('invalidCategoryId');
  });

  it('should throw an error if the food item does not exist', async () => {
    (CategoryModel.findById as jest.Mock).mockResolvedValue({ _id: mockCategoryId, categoryName: 'Main' });
    (FoodModel.findById as jest.Mock).mockResolvedValue(null);
    if (!updateFoodCategory) return;
    await expect(updateFoodCategory({}, { input: { foodId: 'invalidFoodId', categoryId: mockCategoryId } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Food item not found');

    expect(FoodModel.findById).toHaveBeenCalledWith('invalidFoodId');
  });

  it('should return null for categoryId if food.categoryId is not set', async () => {
    const mockFood = {
      _id: mockFoodId,
      foodName: 'Pizza',
      categoryId: null, // Initially null
      save: jest.fn().mockResolvedValue(true),
    };

    (CategoryModel.findById as jest.Mock).mockResolvedValue({ _id: mockCategoryId, categoryName: 'Main' });
    (FoodModel.findById as jest.Mock).mockResolvedValue(mockFood);
    if (!updateFoodCategory) return;
    const result = await updateFoodCategory({}, { input: { foodId: mockFoodId, categoryId: mockCategoryId } }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      foodId: mockFoodId,
      categoryId: mockCategoryId, // Updated to the new categoryId
    });
    expect(mockFood.save).toHaveBeenCalled();
  });
});
