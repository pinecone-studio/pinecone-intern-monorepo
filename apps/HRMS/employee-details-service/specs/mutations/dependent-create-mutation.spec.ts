import { Dependent } from '@/graphql/generated';
import { createDependent } from '@/graphql/resolvers/mutations';

jest.mock('@/models/dependent', () => ({
  DependentModel: {
    create: jest
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

describe('create dependent', () => {
  it('should create a dependent', async () => {
    const result = await createDependent!({} as string, { firstName: 'bat', lastName: 'dorj', phone: '90909090', dependency: 'brother' } as Dependent);
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
      await createDependent!({} as string, { firstName: 'bat', lastName: 'dorj', phone: '90909090', dependency: 'brother' } as Dependent);
    } catch (error) {
      expect(error).toEqual(new Error('failed create dependent'));
    }
  });
});
