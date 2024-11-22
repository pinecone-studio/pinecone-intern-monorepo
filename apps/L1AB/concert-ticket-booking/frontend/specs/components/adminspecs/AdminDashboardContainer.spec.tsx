import { AdminDashboard } from '@/components'; // Adjusted import
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor, screen } from '@testing-library/react';
import { GetAllEventsDocument } from '@/generated';

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
          artistName: ['Artist'],
          description: 'Event description',
          eventDate: ['2022-01-01'],
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
describe('AdminDashboard', () => {
  it('should render successfully with event data', async () => {
    const searchValue = '';
    const selectedValues = [''];
    const date = undefined;

    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <AdminDashboard searchValue={searchValue} selectedValues={selectedValues} date={date} />
      </MockedProvider>
    );

    await waitFor(() => {
      const tableRow = getByTestId('get-events-0');
      expect(tableRow);
    });
  });

  it('should filter events by search value', async () => {
    const searchValue = 'Event 1';
    const selectedValues: string[] = [];
    const date = undefined;

    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <AdminDashboard searchValue={searchValue} selectedValues={selectedValues} date={date} />
      </MockedProvider>
    );

    await waitFor(() => {
      const tableRow = screen.getByTestId('get-events-');
      expect(tableRow);
    });

    expect(screen.getByText('Event 1'));
  });

  it('should filter events by date', async () => {
    const searchValue = '';
    const selectedValues = [''];
    const date = new Date('2022-01-01');

    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <AdminDashboard searchValue={searchValue} selectedValues={selectedValues} date={date} />
      </MockedProvider>
    );

    await waitFor(() => {
      const tableRow = screen.getByTestId('get-events-0');
      expect(tableRow);
    });

    expect(screen.getByText('2022-01-01'));
  });
});
