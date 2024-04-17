import { deleteDependent } from '@/graphql/resolvers/mutations';

jest.mock('@/models/dependent', () => ({
  DependentModel: {
    findByIdAndDelete: jest
      .fn()
      .mockReturnValueOnce({
        _id: '1',
        firstName: 'bat',
        lastName: 'dorj',
        phone: '90909090',
        dependency: 'brother',
      })
      .mockReturnValueOnce(null),
  },
}));
describe('delete dependent', () => {
  it('should delete a dependent', async () => {
    const result = await deleteDependent!({} as string, { _id: '1' });
    expect(result).toEqual({
      _id: '1',
      firstName: 'bat',
      lastName: 'dorj',
      phone: '90909090',
      dependency: 'brother',
    });
  });

  it("should throw an error if the dependent doesn't exist", async () => {
    try {
      await deleteDependent!({} as string, { _id: '1' });
    } catch (error) {
      expect(error).toEqual(new Error('failed delete dependent'));
    }
  });
});
