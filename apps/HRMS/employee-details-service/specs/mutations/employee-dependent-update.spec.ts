import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { EmployeeDependentUpdate } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      populate: jest
        .fn()
        .mockResolvedValueOnce({
          _id: '1',
          firstName: 'bat',
          lastName: 'dorj',
          relative: {
            id: '2',
          },
        })
        .mockReturnValueOnce(null),
    }),
  },
}));

const input = {
  relative: '2',
};

describe('employee dependent update', () => {
  it('should update a employee dependent', async () => {
    const result = await EmployeeDependentUpdate!({}, { id: '1', input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      firstName: 'bat',
      lastName: 'dorj',
      relative: {
        id: '2',
      },
    });
  });

  it('should throw an error if the employee cannot be found', async () => {
    try {
      await EmployeeDependentUpdate!({}, { id: '2', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });

  it('should throw an error if an error occurs during employee retrieval', async () => {
    try {
      await EmployeeDependentUpdate!({}, { id: '1', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
