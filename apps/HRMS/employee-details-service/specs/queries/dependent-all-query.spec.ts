import { getAllDependents } from '@/graphql/resolvers/queries';

jest.mock('@/models/dependent', () => ({
  DependentModel: {
    find: jest
      .fn()
      .mockResolvedValue([
        {
          _id: '1',
          firstName: 'bat',
          lastName: 'dorj',
          phone: '90909090',
          dependency: 'brother',
        },
      ])
      .mockReturnValueOnce(null),
  },
}));

describe('get dependents', () => {
  it('should get all a dependents', async () => {
    const result = await getAllDependents!();
    expect(result).toEqual([
      {
        _id: '1',
        firstName: 'bat',
        lastName: 'dorj',
        phone: '90909090',
        dependency: 'brother',
      },
    ]);
  });

  it("should an throw error if the dependent doesn't", async () => {
    try {
      await getAllDependents!();
    } catch (error) {
      expect(error).toEqual(new Error('failed get all dependents'));
    }
  });
});
