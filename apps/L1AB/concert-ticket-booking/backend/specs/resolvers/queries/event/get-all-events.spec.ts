
import { getAllEvents } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('../../../../src/models', () => ({
  EventModel: {
    find: jest.fn().mockResolvedValue([]),
  },
}));

describe('getAll', () => {
  it('should getAllEvents', async () => {
    if (getAllEvents) {
      const response = await getAllEvents({}, {}, {}, {} as GraphQLResolveInfo);
      expect(response).toEqual([]);
    }
  });
});
