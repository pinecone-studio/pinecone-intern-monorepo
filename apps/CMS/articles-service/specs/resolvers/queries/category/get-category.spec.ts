import { getCategoryById } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/category.model', () => ({
  CategoryModel: {
    findById: jest
      .fn()
      .mockReturnValueOnce({
        _id: '1',
        name: 'tag',
      })
      .mockReturnValueOnce(null),
  },
}));
describe('Get Category', () => {
  it('should return a category', async () => {
    const result = await getCategoryById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      name: 'tag',
    });
  });

  it("should throw an error if the category does't exist", async () => {
    try {
      await getCategoryById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Category not found'));
    }
  });
});
