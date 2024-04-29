import { getCategories } from '../../src/graphql/resolvers/queries/get-categories-query';
import { CategoryModel } from '../../src/models/category.model';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('../../src/models/category.model', () => ({
  CategoryModel: {
    find: jest.fn(),
  },
}));

describe('Category', () => {
  it('should return category', async () => {
    const categories = [{ name: 'Entertainment' }, { name: 'Hollywood' }];
    (CategoryModel.find as jest.Mock).mockResolvedValue(categories);

    const result = await getCategories!({ undefined }, { undefined }, { undefined }, {} as GraphQLResolveInfo);

    expect(result).toEqual(categories);
    expect(CategoryModel.find).toHaveBeenCalledTimes(1);
  });
  it('should return Error', async () => {
    const mockError = new Error('Database error');

    (CategoryModel.find as jest.Mock).mockRejectedValue(mockError);

    await expect(getCategories!({ undefined }, { undefined }, { undefined }, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);

    expect(CategoryModel.find).toHaveBeenCalledTimes(2);
  });
});
