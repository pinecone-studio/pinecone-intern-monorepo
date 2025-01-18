import { updatedOwner } from 'apps/L1FG/real-state/backend/src/resolvers/mutations/owner';
import { OwnerInput } from 'apps/L1FG/real-state/backend/src/generated';
import { GraphQLResolveInfo } from 'graphql';
import { OwnerStats } from 'apps/L1FG/real-state/backend/src/generated/';

jest.mock('apps/L1FG/real-state/backend/src/models/owner-model', () => ({
  Owner: {
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      _id: '67729b7868800928a433e430',
      propertyOwnerId: '2',
      title: 'test',
      description: 'test',
      price: 30000,
      propertyDetail: '1',
      status: 'DECLINED',
      updatedAt: new Date('2024-09-01').toISOString(),
      createdAt: new Date('2024-09-01').toISOString(),
    }),
  },
}));

describe('updatedOwner Resolver', () => {
  it('should update a Owner', async () => {
    const mockinput: OwnerInput = {
      propertyOwnerId: '2',
      title: 'test',
      description: 'test',
      price: 30000,
      propertyDetail: '1',
      status: OwnerStats.Declined,
      updatedAt: new Date('2024-09-01').toISOString(),
      createdAt: new Date('2024-09-01').toISOString(),
    };
    const context = {
      req: {
        user: { id: '67729b7868800928a433e430' },
      },
    };
    const result = await updatedOwner!({}, { input: mockinput, _id: '67729b7868800928a433e430' }, context, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '67729b7868800928a433e430',
      propertyOwnerId: '2',
      title: 'test',
      description: 'test',
      price: 30000,
      propertyDetail: '1',
      status: OwnerStats.Declined,
      updatedAt: new Date('2024-09-01').toISOString(),
      createdAt: new Date('2024-09-01').toISOString(),
    });
  });
});
