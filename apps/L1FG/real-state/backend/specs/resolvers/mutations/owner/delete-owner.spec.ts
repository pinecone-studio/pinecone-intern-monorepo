import { deleteOwner } from 'apps/L1FG/real-state/backend/src/resolvers/mutations/owner';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/real-state/backend/src/models/owner-model', () => ({
  Owner: {
    findByIdAndDelete: jest
      .fn()
      .mockReturnValueOnce({
        _id: '67729b7868800928a433e430',
      })
      .mockReturnValueOnce(null),
  },
}));

describe(' Delete owner post', () => {
  it('should delete owner post', async () => {
    const context = {
      req: {
        owner: { _id: '67729b7868800928a433e430' },
      },
    };
    const result = await deleteOwner!({}, { _id: '67729b7868800928a433e430' }, context, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '67729b7868800928a433e430',
    });
  });
  it('should throw an error if the owner post does not exist', async () => {
    const context = {
      req: {
        owner: { _id: '67729b7868800928a433e430' },
      },
    };
    try {
      await deleteOwner!({}, { _id: '67729b7868800928a433e430' }, context, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Owner not found'));
    }
  });
});
