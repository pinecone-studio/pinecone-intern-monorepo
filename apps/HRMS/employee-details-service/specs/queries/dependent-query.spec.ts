import { getDependent } from '@/graphql/resolvers/queries';
import { DependentModel } from '@/models/dependent';

jest.mock('@/models/dependent', () => ({
  DependentModel: {
    findById: jest
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

describe('get dependent', () => {
  it('should get a dependent', async () => {
    const result = await getDependent!({} as string, { _id: '1' });
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
      await getDependent!({} as string, { _id: '1' });
    } catch (error) {
      expect(error).toEqual(new Error('failed get dependent'));
    }
  });
});
