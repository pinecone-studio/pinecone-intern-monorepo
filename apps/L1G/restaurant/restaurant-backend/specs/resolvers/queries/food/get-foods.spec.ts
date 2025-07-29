import { GraphQLResolveInfo } from 'graphql';
import { getFoods } from 'src/resolvers/queries';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    find: jest.fn().mockReturnValue({
      _id: '1',
      foodName: 'tako',
      price: '20000',
    }),
  },
}));

describe('Get foods', () => {
  it('should return foods', async () => {
    const result = await getFoods?.({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      foodName: 'tako',
      price: '20000',
    });
  });
});
