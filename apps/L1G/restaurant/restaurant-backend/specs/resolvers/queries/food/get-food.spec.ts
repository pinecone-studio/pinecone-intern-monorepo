import { GraphQLResolveInfo } from 'graphql';
import { getFood } from 'src/resolvers/queries';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    findById: jest.fn().mockReturnValueOnce({
      _id: '2',
      foodName: 'Test',
      price: '20000',
    }),
  },
}));

describe('getfood', () => {
  it('should return a food', async () => {
    const result = await getFood?.({}, { foodId: '2' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '2',
      foodName: 'Test',
      price: '20000',
    });
  });

  it("should throw an error if the food doesn't exist", async () => {
    const testFoodId = '3';
    try {
      await getFood?.({}, { foodId: testFoodId }, {}, {} as GraphQLResolveInfo);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toEqual(`Food with ID ${testFoodId} is not found`);
      }
    }
  });
});
