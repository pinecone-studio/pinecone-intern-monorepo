/* eslint-disable no-secrets/no-secrets */
import { GraphQLResolveInfo } from 'graphql';
import { createCategory } from '../../src/graphql/resolvers/mutations';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';

jest.mock('../../src/models/category.model', () => ({
  CategoryModel: {
    create: jest
      .fn()
      .mockReturnValueOnce({
        name: 'leap',
      })
      .mockRejectedValueOnce(null),
  },
}));

describe('create Category', () => {
  it('should create a category', async () => {
    const result = await createCategory!({}, { name:"leap" }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({name:"leap"});
  });

  it('should throw error if cannot create category', async () => {
    try {
      await createCategory!({}, { name:"leap" }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'cannot created category' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});
