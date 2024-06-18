import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { getEmployeeDetails } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    findById: jest.fn().mockReturnValue({
      populate: jest
        .fn()
        .mockResolvedValueOnce({
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          department: 'SOFTWARE',
          jobTitle: 'Engineer',
          ladderLevel: 'Senior',
        })
        .mockResolvedValueOnce(undefined)
        .mockRejectedValueOnce(null),
    }),
  },
}));

describe('get employee', () => {
  it('should get a employee', async () => {
    try {
      const result = await getEmployeeDetails!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
      expect(result).toEqual({
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        department: 'SOFTWARE',
        jobTitle: 'Engineer',
        ladderLevel: 'Senior',
      });
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});
