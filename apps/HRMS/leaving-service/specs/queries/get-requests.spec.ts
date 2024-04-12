import { getRequests } from '@/graphql/resolvers/queries';

jest.mock('@/graphql/model/leave-request', () => ({
  LeaveRequestModel: {
    find: jest.fn().mockResolvedValue([
      {
        _id: '1',
        description: 'test',
        declinedReasoning: 'test',
      },
    ]),
  },
}));

describe('get requests', () => {
  it('should get Requests', async () => {
    const expectedResult = [
      {
        _id: '1',
        description: 'test',
        declinedReasoning: 'test',
      },
    ];
    const result = await getRequests();

    expect(result).toEqual(expectedResult);
  });
});
