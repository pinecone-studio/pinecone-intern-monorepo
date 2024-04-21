import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { getEmployee } from '@/graphql/resolvers/queries';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    findById: jest
      .fn()
      .mockReturnValueOnce({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        department: 'SOFTWARE',
        jobTitle: ['Software Engineer'],
        ladderLevel: 'Senior',
        salary: 100000,
        bankName: 'Example Bank',
        bankAccountNumber: '1234567890',
        bankAccountHolderName: 'John Doe',
        dateOfEmployment: new Date('2020-01-01'),
        dateOfReleased: new Date('2025-01-01'),
        employmentStatus: 'FULL_TIME',
        gender: 'MALE',
        dateOfBirth: new Date('1990-01-01'),
        registrationNumber: '123456',
        phone: '123-456-7890',
        hobby: ['Reading', 'Traveling'],
        homeAddress: '123 Main St, Anytown, USA',
        numberOfFamilyMembers: 4,
        maritalStatus: 'MARRIED',
        relative: ['dependentId1', 'dependentId2'],
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      })
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(null),
  },
}));

describe('get employee', () => {
  it('should get a employee', async () => {
    const result = await getEmployee!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      department: 'SOFTWARE',
      jobTitle: ['Software Engineer'],
      ladderLevel: 'Senior',
      salary: 100000,
      bankName: 'Example Bank',
      bankAccountNumber: '1234567890',
      bankAccountHolderName: 'John Doe',
      dateOfEmployment: new Date('2020-01-01'),
      dateOfReleased: new Date('2025-01-01'),
      employmentStatus: 'FULL_TIME',
      gender: 'MALE',
      dateOfBirth: new Date('1990-01-01'),
      registrationNumber: '123456',
      phone: '123-456-7890',
      hobby: ['Reading', 'Traveling'],
      homeAddress: '123 Main St, Anytown, USA',
      numberOfFamilyMembers: 4,
      maritalStatus: 'MARRIED',
      relative: ['dependentId1', 'dependentId2'],
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-01-01'),
    });
  });
  it('cannot found', async () => {
    try {
      await getEmployee!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });

  it("should throw an error if the employee doesn't exist", async () => {
    try {
      await getEmployee!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});
describe('graphqlErrorHandler', () => {
  test('should return a GraphQLError with the correct error message and extensions', () => {
    const errorMessage = { message: 'employee not found' };
    const errorType = errorTypes.INTERVAL_SERVER_ERROR;
    const result = graphqlErrorHandler(errorMessage, errorType);
    expect(result).toBeInstanceOf(GraphQLError);
    expect(result.message).toBe('employee not found');
    expect(result.extensions).toEqual({
      code: errorType.errorCode,
      http: { status: errorType.errorStatus },
    });
  });
});
