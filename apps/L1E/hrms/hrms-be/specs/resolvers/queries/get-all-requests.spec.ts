import { GraphQLResolveInfo } from 'graphql';
import { getAllRequests } from '../../../src/resolvers/queries/get-all-requests';
import { RequestModel } from '../../../src/models';

jest.mock('../../../src/models', () => ({
  RequestModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        limit: jest
          .fn()
          .mockResolvedValueOnce([{ name: 'test', employeeId: { name: 'test1' }, leadEmployeeId: { name: 'test1' } }])
          .mockResolvedValueOnce(null),
      }),
    }),
  },
}));

describe('getAllRequests', () => {
  const context = {
    req: {
      user: { id: '1' },
    },
  };

  it('should get getAllRequests', async () => {
    const res = await getAllRequests!({}, { limit: 1 }, context, {} as GraphQLResolveInfo);

    expect(RequestModel.find).toHaveBeenCalledTimes(1);

    expect(res).toEqual([{ name: 'test', employeeId: { name: 'test1' }, leadEmployeeId: { name: 'test1' } }]);
  });
  it('should get getAllRequests', async () => {
    await getAllRequests!({}, { limit: undefined }, context, {} as GraphQLResolveInfo);

    expect(RequestModel.find).toHaveBeenCalledTimes(2);
  });
});
