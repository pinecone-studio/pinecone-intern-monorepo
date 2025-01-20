import { GraphQLResolveInfo } from 'graphql';
import { getOwners } from 'apps/L1FG/real-state/backend/src/resolvers/queries/owner/get-owners';
import { Owner } from 'apps/L1FG/real-state/backend/src/models/owner-model';

jest.mock('apps/L1FG/real-state/backend/src/models/owner-model', () => ({
  Owner: {
    find: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '67729b7868800928a433e430',
        propertyOwnerId: '67729b7868800928a433e430',
        title: 'test',
        price: 30000,
        propertyDetail: '67729b7868800928a433e430',
        status: 'DECLINED',
        updatedAt: new Date('2024-09-01').toISOString(),
        createdAt: new Date('2024-09-01').toISOString(),
      })
      .mockResolvedValueOnce(null),
  },
}));

describe('getOwnerById', () => {
  const context = {
    req: {
      owner: { _id: '67729b7868800928a433e430' },
    },
  };
  it('should get owners ', async () => {
    const res = await getOwners!({}, {}, context, {} as GraphQLResolveInfo);

    expect(Owner.find);
    expect(res).toEqual({
      _id: '67729b7868800928a433e430',
      propertyOwnerId: '67729b7868800928a433e430',
      title: 'test',
      price: 30000,
      propertyDetail: '67729b7868800928a433e430',
      status: 'DECLINED',
      updatedAt: new Date('2024-09-01').toISOString(),
      createdAt: new Date('2024-09-01').toISOString(),
    });
  });

  it('should throw an error when no owner is found', async () => {
    await expect(getOwners!({}, {}, context, {} as GraphQLResolveInfo)).rejects.toThrow('there is no owners post');
    expect(Owner.find);
  });
});
