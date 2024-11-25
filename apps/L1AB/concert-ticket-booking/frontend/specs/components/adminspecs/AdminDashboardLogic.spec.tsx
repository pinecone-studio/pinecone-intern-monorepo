import { AdminDash } from '@/components';
import { GetAllEventsDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react';

const mock: MockedResponse = {
  request: {
    query: GetAllEventsDocument,
  },
  result: {
    data: {
      getAllEvents: [
        {
          _id: '1',
          name: 'Event 1',
          artistName: 'Artist',
          description: 'Event description',
          eventDate: '2022-01-01',
          eventTime: '18:00',
          images: ['image_url_1', 'image_url_2'],
          venues: [
            { name: 'Venue A', quantity: 100, price: 50 },
            { name: 'Venue B', quantity: 150, price: 70 },
            { name: 'Venue B', quantity: 150, price: 70 },
          ],
          discount: 10,
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
      ],
    },
  },
};
describe('AdminDash', () => {
  it('should render successfully', async () => {
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <AdminDash />
      </MockedProvider>
    );
  });
});
