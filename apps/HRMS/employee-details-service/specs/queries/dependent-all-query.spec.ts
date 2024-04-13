import { getAllDependents } from '@/graphql/resolvers/queries';

jest.mock('@/models/dependent', () => ({
  DependentModel: {
    find: jest.fn().mockResolvedValue([
      {
        _id: '1',
        firstName: 'bat',
        lastName: 'dorj',
        phone: '90909090',
        dependency: 'brother',
      },
    ]),
  },
}));

describe('get dependents', () => {
  it('should get all a dependents', async () => {
    const result = await getAllDependents();
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
});
