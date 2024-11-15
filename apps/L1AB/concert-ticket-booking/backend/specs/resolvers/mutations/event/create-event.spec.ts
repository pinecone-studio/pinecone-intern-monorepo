import { GraphQLResolveInfo } from 'graphql';
import { EventModel } from '../../../../src/models';
import { createEvent } from '../../../../src/resolvers/mutations';

// Mock EventModel's create function
jest.mock('apps/L1AB/concert-ticket-booking/backend/src/models', () => ({
  EventModel: {
    create: jest.fn().mockResolvedValue({
      _id: 'event_id',
      name: 'Music Fiesta',
      artistName: ['John Doe'],
      description: 'A thrilling karaoke night event',
      eventDate: ['December 25, 2024'],
      eventTime: ['20:00'],
      discount: 10,
      images: ['http://example.com/image1.jpg'],
      venues: [
        {
          name: 'VIP',
          price: 150,
          quantity: 50,
        },
      ],
    }),
  },
}));

describe('createEvent', () => {
  it('should create an event', async () => {
    // Define the event data to be passed in the mutation
    const eventData = {
      input: {
        name: 'Music Fiesta',
        artistName: ['John Doe'],
        description: 'A thrilling karaoke night event',
        eventDate: ['December 25, 2024'],
        eventTime: ['20:00'],
        discount: 10,
        images: ['http://example.com/image1.jpg'],
        venues: [
          {
            name: 'VIP',
            price: 150,
            quantity: 50,
          },
        ],
      },
    };

    // Call the createEvent resolver function
    const response = await createEvent!({}, eventData, { userId: 'id' }, {} as GraphQLResolveInfo);

    // Check if the response matches the expected output
    expect(response).toEqual({
      _id: 'event_id',
      name: 'Music Fiesta',
      artistName: ['John Doe'],
      description: 'A thrilling karaoke night event',
      eventDate: ['December 25, 2024'],
      eventTime: ['20:00'],
      discount: 10,
      images: ['http://example.com/image1.jpg'],
      venues: [
        {
          name: 'VIP',
          price: 150,
          quantity: 50,
        },
      ],
    });

    // Verify that EventModel.create was called with the correct data
    expect(EventModel.create).toHaveBeenCalledWith({
      name: 'Music Fiesta',
      artistName: ['John Doe'],
      description: 'A thrilling karaoke night event',
      eventDate: ['December 25, 2024'],
      eventTime: ['20:00'],
      discount: 10,
      images: ['http://example.com/image1.jpg'],
      venues: [
        {
          name: 'VIP',
          price: 150,
          quantity: 50,
        },
      ],
    });
  });
});
