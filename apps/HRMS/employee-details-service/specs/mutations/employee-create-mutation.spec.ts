import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { createEmployee } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    create: jest
      .fn()
      .mockReturnValueOnce({
        _id: '2',
        firstName: 'bataa',
        lastName: 'od',
        email: 'bataa@gmail.com',
        department: 'SOFTWARE',
      })
      .mockRejectedValueOnce(null),
  },
}));

const input = {
  firstName: 'bataa',
  lastName: 'od',
  email: 'bataa@gmail.com',
  department: 'SOFTWARE',
};
describe('create employee', () => {
  it('should create a employee', async () => {
    const result = await createEmployee!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '2',
      firstName: 'bataa',
      lastName: 'od',
      email: 'bataa@gmail.com',
      department: 'SOFTWARE',
    });
  });

  it("should throw an error if the employee doesn't exist ", async () => {
    try {
      await createEmployee!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
