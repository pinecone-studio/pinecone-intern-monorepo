import { declineRequest } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/graphql/model/leave-request', () => ({
  LeaveRequestModel: {
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      _id: '1',
      description: 'test',
      declinedReasoning: 'test',
    }),
  },
}));

describe('decline request', () => {
  it('should decline request', async () => {
    const _id = '1';
    const result = await declineRequest?.({}, { _id }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({ _id: '1', description: 'test', declinedReasoning: 'test' });
  });
});
