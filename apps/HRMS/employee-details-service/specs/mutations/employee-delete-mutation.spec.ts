import { deleteEmployee } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    findByIdAndDelete: jest
      .fn()
      .mockReturnValueOnce({
        id: '1',
        firstName: 'bat',
        lastName: 'dorj',
        phone: '90909090',
        dependency: 'brother',
      })
      .mockResolvedValueOnce(undefined)
      .mockReturnValueOnce(null),
  },
}));
describe('delete employee', () => {
  it('should delete an employee', async () => {
    const result = await deleteEmployee!({} as string, { id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      id: '1',
      firstName: 'bat',
      lastName: 'dorj',
      phone: '90909090',
      dependency: 'brother',
    });
  });

  it("should throw an error if the employee doesn't exist", async () => {
    try {
      await deleteEmployee!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });
  it('should throw an error if an error occurs during an employee retrieval', async () => {
    try {
      await deleteEmployee!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
