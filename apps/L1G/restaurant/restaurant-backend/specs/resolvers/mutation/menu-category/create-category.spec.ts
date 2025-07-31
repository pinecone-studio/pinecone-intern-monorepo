import { GraphQLResolveInfo } from 'graphql';
import { createCategory } from 'src/resolvers/mutations';

jest.mock('src/models/menu-category.model', () => ({
  MenuCategoryModel: {
    create: jest.fn().mockReturnValue({
      categoryName: 'Test',
    }),
  },
}));

describe('createCategory', () => {
  it('should create a new category', async () => {
    const result = await createCategory?.({}, { input: { categoryName: 'Test' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      categoryName: 'Test',
    });
  });
});
