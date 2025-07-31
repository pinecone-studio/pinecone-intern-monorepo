import { GraphQLResolveInfo } from 'graphql';
import { getCategoryById } from 'src/resolvers/queries';

jest.mock('src/models/menu-category.model', () => ({
  MenuCategoryModel: {
    findById: jest.fn().mockReturnValueOnce({
      _id: '2',
      categoryName: 'Test',
    }),
  },
}));

describe('getCategory', () => {
  it('should return a category', async () => {
    const result = await getCategoryById?.({}, { categoryId: '2' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '2',
      categoryName: 'Test',
    });
  });

  it("should throw an error if the category doesn't exist", async () => {
    const testCategoryId = '3';
    try {
      await getCategoryById?.({}, { categoryId: testCategoryId }, {}, {} as GraphQLResolveInfo);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toEqual(`Category with ID ${testCategoryId} is not found`);
      }
    }
  });
});

// testing
