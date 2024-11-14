import { getEventById } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  EventModel: {
    findById: jest
      .fn()
      .mockResolvedValueOnce({ _id: '1' }) // First call returns an event
      .mockResolvedValueOnce(null), // Second call returns null to simulate not found
  },
}));

describe('getEventById', () => {
  it('should get event by id', async () => {
    const event = await getEventById!({}, { _id: '1' }, { name: 'zul' }, {} as GraphQLResolveInfo);
    expect(event).toEqual({ _id: '1' });
  });

  it('should throw an error if event not found', async () => {
    try {
      await getEventById!({}, { _id: '1' }, { name: 'zul' }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Event not found'));
    }
  });
});
