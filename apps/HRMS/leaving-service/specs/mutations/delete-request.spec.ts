import { deleteLeaveRequest } from '@/graphql/resolvers/mutations';

jest.mock('@/graphql/model/leave-request', () => ({
  LeaveRequestModel: {
    findByIdAndDelete: jest.fn().mockResolvedValue({
      _id: '1',
      description: 'test',
      declinedReasoning: 'test',
    }),
  },
}));

describe('delete request', () => {
  it('should delete request', async () => {
    const _id = '1';
    const res = await deleteLeaveRequest({}, { _id });
    expect(res).toEqual({ _id: '1', description: 'test', declinedReasoning: 'test' });
  });
});
