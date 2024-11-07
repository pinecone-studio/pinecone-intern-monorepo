import { GraphQLResolveInfo } from 'graphql';
import { describe } from 'node:test';
import { getProductsBySearch } from 'src/resolvers/queries/product/get-products-by-search';

jest.mock('../../../../src/models', () => ({
  productModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue([]),
    }),
  },
}));

describe('getProductsBySearch', () => {
  it('should get products by search', async () => {
    const response = await getProductsBySearch!({}, { searchValue: 'kick' }, { userId: '1' }, {} as GraphQLResolveInfo);

    expect(response).toEqual([]);
  });
});

describe('getProductsBySearch', () => {
  it('it should return empty array', async () => {
    await getProductsBySearch!({}, { searchValue: '' }, { userId: '1' }, {} as GraphQLResolveInfo);
  });
});
