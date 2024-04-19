import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { deletedDependent } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

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
      .mockResolvedValueOnce(undefined)
      .mockReturnValueOnce(null),
  },
}));
describe('delete dependent', () => {
  it('should delete a dependent', async () => {
    const result = await deletedDependent!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
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
      await deletedDependent!({}, { id: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });
  it('should throw an error if an error occurs during a dependent retrieval', async () => {
    try {
      await deletedDependent!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
