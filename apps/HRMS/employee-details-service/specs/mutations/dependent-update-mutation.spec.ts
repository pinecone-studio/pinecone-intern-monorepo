import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { updatedDependent } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

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
      .mockResolvedValueOnce(undefined)
      .mockReturnValueOnce(null),
  },
}));

const input = {
  firstName: 'bat',
  lastName: 'dorj',
  phone: '90909090',
  dependency: 'brother',
};
describe('update dependent', () => {
  it('should update a dependent', async () => {
    const result = await updatedDependent!({}, { id: '1', input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      firstName: 'bat',
      lastName: 'dorj',
      phone: '90909090',
      dependency: 'brother',
    });
  });

  it('should throw an error if the dependent cannot be found', async () => {
    try {
      await updatedDependent!({}, { id: '2', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });

  it('should throw an error if an error occurs during dependent retrieval', async () => {
    try {
      await updatedDependent!({}, { id: '1', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
