import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { getAllEmployee } from '@/graphql/resolvers/queries/employee-all-query';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    find: jest
      .fn()
      .mockReturnValueOnce([
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          department: 'SOFTWARE',
          jobTitle: ['Engineer'],
          ladderLevel: 'S',
          salary: 80000,
          dateOfEmployment: new Date('2020-01-15'),
          dateOfReleased: new Date('2024-04-15'),
          employmentStatus: 'PART_TIME',
        },
      ])
      .mockRejectedValueOnce(null)
  },
}));

describe('get employee', () => {
  it('should get all employees', async () => {
    const result = await getAllEmployee!();
    expect(result).toEqual([
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        department: 'SOFTWARE',
        jobTitle: ['Engineer'],
        ladderLevel: 'S',
        salary: 80000,
        dateOfEmployment: new Date('2020-01-15'),
        dateOfReleased: new Date('2024-04-15'),
        employmentStatus: 'PART_TIME',
      },
    ]);
  });
  it("should throw an error if the all employee doesn't exist", async () => {
    try {
      await getAllEmployee!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});
