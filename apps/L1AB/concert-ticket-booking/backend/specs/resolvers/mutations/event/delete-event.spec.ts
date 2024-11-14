import { GraphQLResolveInfo } from 'graphql';
import { deleteEvent } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  EventModel: {
    findByIdAndDelete: jest.fn().mockResolvedValueOnce({ _id: '1' }).mockReturnValue(null),
  },
}));

describe('Delete Event', () => {
  it('It should delete Event', async () => {
    const result = await deleteEvent!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({ _id: '1' });
  });

  it('It should throw an error', async () => {
    try {
      await deleteEvent!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Event not deleted'));
    }
  });
});
