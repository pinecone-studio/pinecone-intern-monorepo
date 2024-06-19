import { Department, EmploymentStatus } from '@/graphql/generated';
import { createEmployee } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    create: jest
      .fn()
      .mockReturnValueOnce({
        _id: '2',
        firstname: 'bataa',
        lastname: 'od',
        email: 'bataa@gmail.com',
        department: 'SOFTWARE',
        jobTitle: ['developer', 'fullstack'],
        salary: 3500000,
        dateOfEmployment: '2024-7-22',
        employmentStatus: 'FULL_TIME',
      })
      .mockRejectedValueOnce(new Error('Алдаа гарлаа')),
  },
}));

const input = {
  firstname: 'bataa',
  lastname: 'od',
  email: 'bataa@gmail.com',
  department: Department.Software,
  jobTitle: ['developer', 'fullstack'],
  salary: 3500000,
  dateOfEmployment: '2024-7-22',
  employmentStatus: EmploymentStatus.FullTime,
};

describe('create employee', () => {
  it('should create an employee', async () => {
    const result = await createEmployee!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '2',
      firstname: 'bataa',
      lastname: 'od',
      email: 'bataa@gmail.com',
      department: Department.Software,
      jobTitle: ['developer', 'fullstack'],
      salary: 3500000,
      dateOfEmployment: '2024-7-22',
      employmentStatus: EmploymentStatus.FullTime,
    });
  });

  it('should throw an error if the employee creation fails', async () => {
    try {
      await createEmployee!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      const typedError = error as { message: string; extensions: { code: string } };
      expect(typedError.message).toBe('Алдаа гарлаа');
      expect(typedError.extensions.code).toBe('BAD_REQUEST');
    }
  });
});
