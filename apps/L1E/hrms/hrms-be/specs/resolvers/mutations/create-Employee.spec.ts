import { createEmployee } from '../../../src/resolvers/mutations';
import { EmployeeStatus } from '../../../src/models/employee.model';
import { GraphQLResolveInfo } from 'graphql';
import { EmployeeInput } from '../../../src/generated';
jest.mock('../../../src/models', () => ({
  EmployeeModel: {
    create: jest.fn().mockReturnValue({
      _id: '1',
      email: 'test@example.com',
      jobTitle: 'Developer',
      username: 'testuser',
      employeeStatus: 'Employee',
      createdAt: '2024-01-01T09:00:00Z',
      remoteLimit: 1,
      paidLeaveLimit: 1,
      freeLimit: 1,
    }),
  },
}));

describe('createEmployee Resolver', () => {
  it('should create a Employee ', async () => {
    const mockinput: EmployeeInput = {
      email: 'test@example.com',
      jobTitle: 'Developer',
      username: 'testuser',
      employeeStatus: EmployeeStatus.Employee,
      createdAt: '2024-01-01T09:00:00Z',
    };
    const context = {
      req: {
        user: { _id: '1' },
      },
    };
    const result = await createEmployee!({}, { input: mockinput }, context, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      email: 'test@example.com',
      jobTitle: 'Developer',
      username: 'testuser',
      employeeStatus: 'Employee',
      createdAt: '2024-01-01T09:00:00Z',
      remoteLimit: 1,
      paidLeaveLimit: 1,
      freeLimit: 1,
    });
  });
  it('should throw an error if the employeeStatus is invalid', async () => {
    const mockinput: EmployeeInput = {
      email: 'test@example.com',
      jobTitle: 'Developer',
      username: 'testuser',
      employeeStatus: 'InvalidStatus' as any, // Passing an invalid status
      createdAt: '2024-01-01T09:00:00Z',
    };

    const context = {
      req: {
        user: { _id: '1' },
      },
    };

    // Expect the error to be thrown
    await expect(createEmployee!({}, { input: mockinput }, context, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid employee status');
  });
});
