import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor, screen } from '@testing-library/react';
import { GetAllEventsDocument } from '@/generated';
import { Demo } from '@/components/admincomponents/DemoComponent';

const mock: MockedResponse = {
  request: {
    query: GetAllEventsDocument,
    variables: {},
  },
  result: {
    data: {
      getAllEvents: [
        {
          _id: '1',
          name: 'Event 1',
          artistName: ['Artist'],
          description: 'Event description',
          eventDate: ['2022-01-01'],
          eventTime: '18:00',
          images: ['image_url_1', 'image_url_2'],
          venues: [
            { name: 'Venue A', quantity: 100, price: 50, firstquantity: 1 },
            { name: 'Venue B', quantity: 150, price: 70, firstquantity: 1 },
            { name: 'Venue B', quantity: 150, price: 70, firstquantity: 1 },
          ],
          status: 'Demo',
          discount: 10,
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
        {
          _id: '2',
          name: 'Event 2',
          artistName: ['Artist2'],
          description: 'Event description2',
          eventDate: ['2022-01-02'],
          eventTime: '18:00',
          images: ['image_url_2', 'image_url_3'],
          venues: [
            { name: 'Venue A', quantity: 100, price: 50, firstquantity: 1 },
            { name: 'Venue B', quantity: 150, price: 70, firstquantity: 1 },
            { name: 'Venue B', quantity: 150, price: 70, firstquantity: 1 },
          ],
          status: 'Demo',
          discount: 10,
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
      ],
    },
  },
};

describe('AdminDashboard', () => {
  it('should filter events by eventStatus', async () => {
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <Demo />
      </MockedProvider>
    );
    await waitFor(() => {
      const tableRow = screen.getByTestId('get-demo-0');
      expect(tableRow);
    });
  });
});
