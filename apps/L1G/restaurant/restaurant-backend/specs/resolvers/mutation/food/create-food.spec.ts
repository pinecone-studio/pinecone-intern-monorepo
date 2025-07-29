import { GraphQLResolveInfo } from 'graphql';
import { createFood } from 'src/resolvers/mutations';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    create: jest.fn().mockReturnValue({
      foodName: 'Test',
      price: '20000',
      image: 'image.jpg',
      status: 'active',
    }),
  },
}));

describe('createFood', () => {
  it('should create a new food', async () => {
    const result = await createFood?.({}, { input: { foodName: 'Test', price: '20000', image: 'image.jpg', status: 'active' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      foodName: 'Test',
      price: '20000',
      image: 'image.jpg',
      status: 'active',
    });
  });
});
