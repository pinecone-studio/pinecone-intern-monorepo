import { creteRequest } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  RequestModel: {
    create: jest.fn().mockReturnValue({
      from: 'hi',
      to: 'hello',
      status: 'PENDING',
    }),
  },
}));

describe('Create a request', () => {
  it('should make a request', async () => {
    if (!creteRequest) {
      return;
    }
    const input = {
      from: 'hi',
      to: 'hello',
      status: 'PENDING',
    };

    const result = await creteRequest({}, { input }, { userId: '12' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      from: 'hi',
      to: 'hello',
      status: 'PENDING',
    });
  });
  it('should throw an unauthorized error', async () => {
    if (!creteRequest) {
      return;
    }
    const input = {
      from: 'hi',
      to: 'hello',
      status: 'PENDING',
    };
    await expect(creteRequest({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});
