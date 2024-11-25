import { updateEventStatus } from 'apps/L1AB/concert-ticket-booking/backend/src/resolvers/mutations/event/update-event.status';
import { updateBooking } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  EventModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        status: 'Updated',
      })
      .mockResolvedValueOnce(null)
      .mockRejectedValueOnce(new Error('Database error')),
  },
}));

describe('Update Event Mutation', () => {
  it('Should update event', async () => {
    const result = await updateEventStatus(
      {},
      {
        input: {
          _id: '1',
          status: 'Updated',
        },
      }
    );

    expect(result).toEqual({
      _id: '1',
      status: 'Updated',
    });
  });

  it('Should throw an error if the event is not found', async () => {
    try {
      await updateEventStatus(
        {},
        {
          input: {
            _id: '1',
            status: 'Updated',
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Failed to update event');
      } else {
        fail('Expected error to be an instance of Error');
      }
    }
  });

  it('Should throw an error if there is a database error', async () => {
    try {
      await updateBooking(
        {},
        {
          input: {
            _id: '1',
            status: 'Updated',
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Failed to update event');
      } else {
        fail('Expected error to be an instance of Error');
      }
    }
  });
});
