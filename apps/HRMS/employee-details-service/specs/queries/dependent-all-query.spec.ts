import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { getAllDependents } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/dependent', () => ({
  DependentModel: {
    find: jest
      .fn()
      .mockReturnValueOnce([
        {
          _id: '1',
          firstName: 'bat',
          lastName: 'dorj',
          phone: '90909090',
          dependency: 'brother',
        },
      ])
      .mockRejectedValueOnce(null),
  },
}));

describe('get dependents', () => {
  it('should get all a dependents', async () => {
    const result = await getAllDependents!({}, {}, {}, {} as GraphQLResolveInfo);
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

  it("should throw an error if the all dependents doesn't exist", async () => {
    try {
      await getAllDependents!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});
