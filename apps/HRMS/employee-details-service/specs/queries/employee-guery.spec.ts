import { getEmployee } from '@/graphql/resolvers/queries';
jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    findById: jest
      .fn()
      .mockReturnValueOnce({
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
      .mockReturnValueOnce(null),
  },
}));

describe('get employee', () => {
  it('should get a employee', async () => {
    try {
      const result = await getEmployee(null, { id: '1' });
      expect(result).toEqual({
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
    } catch (error) {
      expect(error).toEqual(new Error('Employee not found'));
    }
  });

  it("should throw an error if the employee doesn't exist", async () => {
    try {
      await getEmployee!({} as string, { _id: '1' });
    } catch (error) {
      expect(error).toEqual(new Error('Employee not found'));
    }
  });
});
