import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { getAllEmployee } from '@/graphql/resolvers/queries/employee-all-query';
import { EmployeeModel } from '@/models/employee';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/employee', () => ({
  EmployeeModel: {
    find: jest.fn().mockReturnValue({
      populate: jest
        .fn()
        .mockResolvedValueOnce([
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
        ])
        .mockRejectedValueOnce(null),
    }),
  },
}));

describe('get all employee', () => {
  it('should get all employees', async () => {
    const result = await getAllEmployee!({});
    expect(result).toEqual([
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
    ]);
    expect(EmployeeModel.find).toHaveBeenCalled();
    expect(EmployeeModel.find().populate).toHaveBeenCalled();
  });
  it("should throw an error if the all employee doesn't exist", async () => {
    try {
      await getAllEmployee!({}, {}, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});
