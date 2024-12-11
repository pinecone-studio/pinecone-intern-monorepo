import { GetAllEventsDocument, GetEventByIdDocument } from '@/generated';

export const mocks = [
  {
    request: {
      query: GetEventByIdDocument,
      variables: { id: '1' },
    },
    result: {
      data: {
        getEventById: {
          _id: '1',
          name: 'Rock Concert',
          artistName: ['Band A', 'Band B'],
          description: 'An amazing rock concert.',
          eventDate: ['2024-11-25', '2024-11-26'],
          eventTime: ['18:00'],
          images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image2.jpg'],
          venues: [
            { name: 'Venue A', quantity: 100, price: 50 },
            { name: 'Venue B', quantity: 150, price: 70 },
            { name: 'Venue C', quantity: 150, price: 70 },
          ],
          status: 'Regular',
          discount: 10,
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
      },
    },
  },
  {
    request: {
      query: GetAllEventsDocument,
    },
    result: {
      data: {
        getAllEvents: [
          {
            _id: '2',
            name: 'Event 1',
            eventDate: '2022-01-01',
            eventTime: '20-30',
            artistName: 'test',
            description: 'Event 1 Description',
            images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
            venues: [
              { name: 'test', quantity: 20, price: 20 },
              { name: 'test', quantity: 20, price: 20 },
              { name: 'test', quantity: 20, price: 20 },
            ],
            status: 'Regular',

            discount: 20,
            createdAt: '2024-11-14T06:24:52.763Z',
            updatedAt: '2024-11-14T06:24:52.763Z',
          },
          {
            _id: '3',
            name: 'Event 1',
            eventDate: '2022-01-01',
            eventTime: '20-30',
            artistName: 'test',
            description: 'Event 1 Description',
            images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
            venues: [
              { name: 'test', quantity: 20, price: 20 },
              { name: 'test', quantity: 20, price: 20 },
              { name: 'test', quantity: 20, price: 20 },
            ],
            status: 'Онцлох',
            discount: 20,
            createdAt: '2024-11-14T06:24:52.763Z',
            updatedAt: '2024-11-14T06:24:52.763Z',
          },
        ],
      },
    },
  },
];
