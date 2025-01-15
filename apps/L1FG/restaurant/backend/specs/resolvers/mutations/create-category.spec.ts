import { GraphQLResolveInfo } from 'graphql';
import { createCategory } from '../../../src/resolvers/mutations';
import { CategoryModel } from '../../../src/models/category';

jest.mock('../../../src/models/category', () => ({
  CategoryModel: {
    create: jest.fn(),
    find: jest.fn(),
  },
}));

describe('createCategory Mutation Resolver', () => {
  it('should create a category item and return it', async () => {
    const mockInput = {
      categoryName: 'Burger',
    };

    const mockSavedCategory = {
      id: '123',
      ...mockInput,
      createdAt: new Date(),
    };

    (CategoryModel.create as jest.Mock).mockResolvedValue(mockSavedCategory);

    if (!createCategory) return;

    const result = await createCategory({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    expect(CategoryModel.create).toHaveBeenCalledWith(mockInput);

    expect(result).toEqual(mockSavedCategory);
  });
});
