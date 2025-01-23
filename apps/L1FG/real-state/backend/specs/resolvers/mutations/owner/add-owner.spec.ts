import { addOwner } from 'apps/L1FG/real-state/backend/src/resolvers/mutations/owner';
import { GraphQLResolveInfo } from 'graphql';
import { OwnerInput, OwnerStats } from 'apps/L1FG/real-state/backend/src/generated';

jest.mock('apps/L1FG/real-state/backend/src/models/owner-model', () => ({
  Owner: {
    create: jest.fn().mockResolvedValueOnce({
      _id: '67729b7868800928a433e430',
      propertyOwnerId: '67729b7868800928a433e430',
      title: 'bair',
      description: '1 uruu',
      price: 100000,
      propertyDetail: '67729b7868800928a433e430',
      status: 'PENDING',
      updatedAt: new Date('2024-09-01').toISOString(),
      createdAt: new Date('2024-09-01').toISOString(),
    }),
  },
}));

describe('addOwner Mutation', () => {
  it('1, should add a owner successfully', async () => {
    const mockInput: OwnerInput = {
      _id: '67729b7868800928a433e430',
      propertyOwnerId: '67729b7868800928a433e430',
      title: 'bair',
      description: '1 uruu',
      price: 100000,
      propertyDetail: '67729b7868800928a433e430',
      status: OwnerStats.Pending,
      updatedAt: new Date('2024-09-01').toISOString(),
      createdAt: new Date('2024-09-01').toISOString(),
    };

    const result = await addOwner!({}, { input: mockInput }, { userId: null }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '67729b7868800928a433e430',
      propertyOwnerId: '67729b7868800928a433e430',
      description: '1 uruu',
      title: 'bair',
      price: 100000,
      propertyDetail: '67729b7868800928a433e430',
      status: OwnerStats.Pending,
      updatedAt: new Date('2024-09-01').toISOString(),
      createdAt: new Date('2024-09-01').toISOString(),
    });
  });
});
