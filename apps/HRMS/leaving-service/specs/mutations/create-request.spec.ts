import { LeaveRequestModel } from '@/graphql/model/leave-request';
import { createLeaveRequest } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/graphql/model/leave-request', () => ({
  LeaveRequestModel: {
    create: jest.fn().mockResolvedValue({
      _id: '1',
      description: 'test',
      declinedReasoning: 'test',
    }),
  },
}));

describe('create leave request', () => {
  it('should create a leaveRequest', async () => {
    const requestInput = {
      description: 'test',
      declinedReasoning: 'test',
    };
    const res = await createLeaveRequest({}, { requestInput }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual({ _id: '1', description: 'test', declinedReasoning: 'test' });
    expect(LeaveRequestModel.create).toHaveBeenCalledWith(requestInput);
  });
});
