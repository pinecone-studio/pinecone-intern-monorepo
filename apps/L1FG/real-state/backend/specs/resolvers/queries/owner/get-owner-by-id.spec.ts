import { GraphQLResolveInfo } from 'graphql';
import { getOwnerById } from 'apps/L1FG/real-state/backend/src/resolvers/queries';
import { Owner } from 'apps/L1FG/real-state/backend/src/models/owner-model';

jest.mock('apps/L1FG/real-state/backend/src/models/owner-model', () => ({
  Owner: {
    findById: jest
      .fn()
      .mockResolvedValueOnce({
        title: 'test',
      })
      .mockResolvedValueOnce(null),
  },
}));

describe('getOwner', () => {
  const context = {
    userId: '67729b7868800928a433e430',
  };

  it('should get owner post', async () => {
    const res = await getOwnerById!({}, { _id: '' }, context, {} as GraphQLResolveInfo);
    expect(Owner.findById).toHaveBeenCalledWith('');
    expect(res).toEqual({
      title: 'test',
    });
  });

  it('should throw an error if onwer is not found', async () => {
    await expect(getOwnerById!({}, { _id: '67729b7868800928a433e430' }, context, {} as GraphQLResolveInfo)).rejects.toThrow('There is no owner post with this');
    expect(Owner.findById).toHaveBeenCalledWith('');
  });
});
