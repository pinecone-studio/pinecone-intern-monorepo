import { getEmployeesByPaginate } from '@/graphql/resolvers/queries/get-employees-by-paginate';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    find: jest
      .fn()
      .mockReturnValueOnce({
        limit: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue([
            {
              id: '1',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              department: 'SOFTWARE',
              employmentStatus: 'PART_TIME',
            },
          ]),
        }),
      })
      .mockReturnValueOnce({
        countDocuments: jest.fn().mockResolvedValueOnce(1),
      }),
  },
}));

const mockData = {
  employees: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      department: 'SOFTWARE',
      employmentStatus: 'PART_TIME',
    },
  ],
  totalEmployees: 1,
};
describe('This function should return employee with matching filters', () => {
  it('sShould return employees with limit', async () => {
    const result = await getEmployeesByPaginate!({}, { paginationInput: { limit: 1, page: 1 } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockData);
  });
});
