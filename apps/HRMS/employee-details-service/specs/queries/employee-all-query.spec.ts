import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { getEmployees } from '@/graphql/resolvers/queries';
import { EmployeeModel } from '@/models/employee';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/employee');

describe('getEmployees', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all employees', async () => {
    const employees = [
      {
        _id: '66389a887bc2c1b3a29a5589',
        jobTitle: 'Develop',
        ladderLevel: '4',
        lastName: 'namsrai',
        relative: [
          {
            id: '661f51a2ff68426a6cf74628',
            firstName: 'selengee',
            lastName: 'batsuuri',
            phone: '90909090',
          },
        ],
      },
    ];

    (EmployeeModel.find as jest.Mock).mockResolvedValueOnce(employees);

    const result = await getEmployees!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(employees);
    expect(EmployeeModel.find).toHaveBeenCalled();
  });

  it("should throw an error if the employees don't exist", async () => {
    const mockedError = new Error('Mocked error');

    (EmployeeModel.find as jest.Mock).mockRejectedValueOnce(mockedError);

    await expect(getEmployees!({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
  });
});
