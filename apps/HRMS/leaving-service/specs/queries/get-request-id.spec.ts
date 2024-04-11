import { getRequestById } from '@/graphql/resolvers/queries';

jest.mock('@/graphql/model/leave-request', () => ({
  LeaveRequestModel: {
    findById: jest.fn().mockResolvedValue({
      _id: '1',
      description: 'test',
      declinedReasoning: 'test',
    }),
  },
}));

describe('get requestById', () => {
  it('should get RequestById', async () => {
    const _id = '1';
    const result = await getRequestById({}, { _id });
    expect(result).toEqual({
      _id: '1',
      description: 'test',
      declinedReasoning: 'test',
    });
  });
});
