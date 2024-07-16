import { createCategory } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  CategoryModel: {
    create: jest.fn().mockReturnValue({
      _id: '1',
      name: 'test',
    }),
  },
}));

describe('Create Category', () => {
  it('should create a category', async () => {
    const result = await createCategory!({}, { name: 'test' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      name: 'test',
    });
  });
});
