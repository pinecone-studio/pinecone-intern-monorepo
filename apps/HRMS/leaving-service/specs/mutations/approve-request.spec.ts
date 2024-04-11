import { approveRequest } from '@/graphql/resolvers/mutations';

jest.mock('@/graphql/model/leave-request', () => ({
  LeaveRequestModel: {
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      _id: '1',
      description: 'test',
      declinedReasoning: 'test',
    }),
  },
}));

describe('approve request', () => {
  it('should approve request', async () => {
    const _id = '1';
    const result = await approveRequest({}, { _id });

    expect(result).toEqual({ _id: '1', description: 'test', declinedReasoning: 'test' });
  });
});
