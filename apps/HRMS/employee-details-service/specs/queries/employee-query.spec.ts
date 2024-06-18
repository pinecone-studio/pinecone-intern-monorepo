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
  });
  it('cannot found', async () => {
    try {
      await getEmployeeDetails!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });

  it("should throw an error if the employee doesn't exist", async () => {
    try {
      await getEmployeeDetails!({}, { id: '2' }, { undefined }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});
