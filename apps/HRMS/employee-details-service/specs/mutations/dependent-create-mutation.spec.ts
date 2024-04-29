import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { createDependent } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../src/models/dependent', () => ({
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
      .mockRejectedValue(null),
  },
}));

const input = {
  firstName: 'bat',
  lastName: 'dorj',
  phone: '90909090',
  dependency: 'brother',
};

describe('create dependent', () => {
  it('should create a dependent', async () => {
    const result = await createDependent!({}, { input }, {}, {} as GraphQLResolveInfo);
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
      await createDependent!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
