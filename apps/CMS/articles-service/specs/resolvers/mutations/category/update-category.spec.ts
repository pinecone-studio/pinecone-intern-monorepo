import { GraphQLResolveInfo } from 'graphql';
import { updateCategory } from '../../../../src/graphql/resolvers/mutations';

jest.mock('@/models/category.model', () => ({
  CategoryModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockReturnValueOnce({
        _id: '1',
        name: 'test',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('Update Category', () => {
  it('should update a category', async () => {
    const result = await updateCategory!({}, { _id: '1', name: 'test' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      name: 'test',
    });
  });

  it("should throw on error if the category doesn't exist", async () => {
    try {
      await updateCategory!({}, { _id: '1', name: 'test' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      console.error('Caught error:', error);
      expect(error).toEqual(new Error('Category not found'));
    }
  });
});
