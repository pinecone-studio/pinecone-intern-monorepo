import { GraphQLResolveInfo } from 'graphql';
import { FoodModel } from 'src/models/food.model';
import { deleteFood } from 'src/resolvers/mutations';

jest.mock('src/models/food.model', () => ({
  FoodModel: {
    findByIdAndDelete: jest.fn().mockResolvedValue({
      foodId: '2',
      foodName: 'Test',
      price: '10',
      image: 'image.jpg',
      foodStatus: 'Идэвхитэй',
    }),
  },
}));

describe('deleteFood', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete food', async () => {
    const result = await deleteFood?.({}, { foodId: '2' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(
      expect.objectContaining({
        foodId: '2',
        foodName: 'Test',
      })
    );
  });

  it("should throw an error if the food doesn't exist", async () => {
    (FoodModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deleteFood?.({}, { foodId: '3' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Food with ID 3 not found');
    expect(FoodModel.findByIdAndDelete).toHaveBeenCalledWith('3');
  });
});
