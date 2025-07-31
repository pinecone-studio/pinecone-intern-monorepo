import { GraphQLResolveInfo } from 'graphql';
import { getCategories } from 'src/resolvers/queries';

jest.mock('src/models/menu-category.model', () => ({
  MenuCategoryModel: {
    find: jest.fn().mockReturnValue({
      _id: '1',
      categoryName: 'Test',
    }),
  },
}));

describe('getCategories', () => {
  it('should return categories', async () => {
    const result = await getCategories?.({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      categoryName: 'Test',
    });
  });
});
