import { updateEvent } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  EventModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        name: 'Updated Name',
        aritstName: 'Updated Artist Name',
        description: 'Updated Description',
        eventDate: 'Updated Event Date',
        eventTime: 'Updated Event Time',
        images: 'Updated Image Links',
        discount: 10,
      })
      .mockResolvedValueOnce(null)
      .mockRejectedValueOnce(new Error('Database error')),
  },
}));

describe('Update Event Mutation', () => {
  it('Should update event', async () => {
    const result = await updateEvent(
      {},
      {
        input: {
          eventId: '1',
          name: 'testName',
          artistName: ['testArtistName'],
          description: 'testDescription',
          eventDate: ['2024-01-01'],
          eventTime: ['12:00'],
          images: ['testImageLinks'],
          discount: 1,
        },
      }
    );

    expect(result).toEqual({
      _id: '1',
      name: 'Updated Name',
      aritstName: 'Updated Artist Name',
      description: 'Updated Description',
      eventDate: 'Updated Event Date',
      eventTime: 'Updated Event Time',
      images: 'Updated Image Links',
      discount: 10,
    });
  });

  it('Should throw an error if the event is not found', async () => {
    try {
      await updateEvent(
        {},
        {
          input: {
            eventId: '999',
            name: 'testName',
            artistName: ['testArtistName'],
            description: 'testDescription',
            eventDate: ['2024-01-01'],
            eventTime: ['12:00'],
            images: ['testImageLinks'],
            discount: 1,
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
      await updateEvent(
        {},
        {
          input: {
            eventId: '1',
            name: 'testName',
            artistName: ['testArtistName'],
            description: 'testDescription',
            eventDate: ['2024-01-01'],
            eventTime: ['12:00'],
            images: ['testImageLinks'],
            discount: 1,
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
