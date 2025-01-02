import { GraphQLResolveInfo } from 'graphql';
import { RequestModel } from '../../../src/models';
import { getRequestsByEmployee } from '../../../src/resolvers/queries';

jest.mock('../../../src/models', () => ({
  RequestModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce([{ name: 'test' }])
      .mockResolvedValueOnce(null),
  },
}));

describe('getRequestsByEmployee', () => {
  const context = {
    req: {
      user: { id: '1' },
    },
  };

  it('should get requests for the employee', async () => {
    const res = await getRequestsByEmployee!({}, { employeeId: '12' }, context, {} as GraphQLResolveInfo);

    expect(RequestModel.find);

    expect(res).toEqual([{ name: 'test' }]);
  });

  it('should throw an error when no requests are found', async () => {
    await expect(getRequestsByEmployee!({}, { employeeId: '1' }, context, {} as GraphQLResolveInfo)).rejects.toThrow('No requests found for the provided employee ID');

    expect(RequestModel.find).toHaveBeenCalledWith({ employeeId: '1' });
  });
});
