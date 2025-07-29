import { GraphQLResolveInfo } from 'graphql';
import { FoodModel } from 'src/models/food.model';
import { deleteFood } from 'src/resolvers/mutations';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    findByIdAndDelete: jest.fn().mockResolvedValue({
      foodId: '1',
    }),
  },
}));

describe('deleteFood', () => {
  it('should delete a food', async () => {
    const result = await deleteFood?.({}, { foodId: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      foodId: '1',
    });
  });

  it("should throw an error if the food doesn't exist", async () => {
    (FoodModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deleteFood?.({}, { foodId: '3' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Food with ID 3 is not found');

    expect(FoodModel.findByIdAndDelete).toHaveBeenCalledWith('3');
  });
});
