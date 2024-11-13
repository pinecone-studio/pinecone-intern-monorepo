import { getAllEvents } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  EventModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce([{ _id: '1', name: 'Sample Event' }]) // First call returns one event
      .mockResolvedValueOnce([]), // Second call returns an empty array
  },
}));

describe('getAllEvents', () => {
  it('should return all events', async () => {
    const events = await getAllEvents!({}, {}, { name: 'tu' }, {} as GraphQLResolveInfo);
    expect(events).toEqual([{ _id: '1', name: 'Sample Event' }]);
  });

  it('should return an empty array if no events are found', async () => {
    const events = await getAllEvents!({}, {}, { name: 'tu' }, {} as GraphQLResolveInfo);
    expect(events).toEqual([]);
  });
});
