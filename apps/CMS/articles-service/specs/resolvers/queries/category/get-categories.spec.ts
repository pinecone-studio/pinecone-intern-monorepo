import { getCategories } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/category.model', () => ({
  CategoryModel: {
    find: jest.fn().mockResolvedValue([
      {
        _id: '1',
        name: 'tag',
      },
    ]),
  },
}));

describe('Get Categories', () => {
  it('should return a categories', async () => {
    const result = await getCategories!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual([
      {
        _id: '1',
        name: 'tag',
      },
    ]);
  });
});
