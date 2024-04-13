import { updateDependent } from '@/graphql/resolvers/mutations';
import { DependentModel } from '@/models/dependent';

jest.mock('@/models/dependent', () => ({
  DependentModel: {
    findByIdAndUpdate: jest
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

describe('update dependent', () => {
  it('should update a dependent', async () => {
    const result = await updateDependent!({}, { _id: '1', firstName: 'bat', lastName: 'dorj', phone: '90909090', dependency: 'brother' });
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
      await updateDependent!({}, { _id: '1', firstName: 'bat', lastName: 'dorj', phone: '90909090', dependency: 'brother' });
    } catch (error) {
      expect(error).toEqual(new Error('failed update dependent'));
    }
  });
});
