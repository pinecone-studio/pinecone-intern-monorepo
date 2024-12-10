/* eslint-disable max-lines */
import { AdminDashboard } from '@/components';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor, screen } from '@testing-library/react';
import { GetAllEventsDocument } from '@/generated';

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
          status: 'Regular',
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
          status: 'Онцлох',
          discount: 10,
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
        {
          _id: '3',
          name: 'Event 3',
          artistName: ['Artist3'],
          description: 'Event description3',
          eventDate: ['2022-01-03'],
          eventTime: '18:00',
          images: ['image_url_2', 'image_url_4'],
          venues: [
            { name: 'Venue A', quantity: 100, price: 50, firstquantity: 1 },
            { name: 'Venue B', quantity: 150, price: 70, firstquantity: 1 },
            { name: 'Venue B', quantity: 150, price: 70, firstquantity: 1 },
          ],
          status: 'Онцлох',
          discount: 10,
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
        {
          _id: '4',
          name: 'Event 4',
          artistName: ['Artist4'],
          description: 'Event description4',
          eventDate: ['2022-01-05'],
          eventTime: '18:04',
          images: ['image_url_1', 'image_url_2'],
          venues: [
            { name: 'Venue A', quantity: 100, price: 50, firstquantity: 1 },
            { name: 'Venue B', quantity: 150, price: 70, firstquantity: 1 },
            { name: 'Venue B', quantity: 150, price: 70, firstquantity: 1 },
          ],
          status: 'Regular',
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
    const searchValue = '';
    const selectedValues: string[] = [];
    const date = undefined;
    const eventStatus = 'regular';
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <AdminDashboard searchValue={searchValue} selectedValues={selectedValues} date={date} eventStatus={eventStatus} />
      </MockedProvider>
    );
    await waitFor(() => {
      const tableRow = screen.getByTestId('get-events-0');
      expect(tableRow);
    });
    const otherStatusCell = screen.queryByText('Oнцлох');
    expect(otherStatusCell);
  });
  it('should display the "No results found" message when no events match the filters', async () => {
    const searchValue = 'NonExistentEvent';
    const selectedValues: string[] = [];
    const date = new Date('2024-01-01');
    const eventStatus = 'regular';
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <AdminDashboard searchValue={searchValue} selectedValues={selectedValues} date={date} eventStatus={eventStatus} />
      </MockedProvider>
    );
    await waitFor(() => {
      const noResultsMessage = screen.getByText('Хайлт тохирох үр дүн олдсонгүй.');
      expect(noResultsMessage);
    });
  });
  it('should render all events when no filters are applied', async () => {
    const searchValue = '';
    const selectedValues: string[] = [];
    const date = undefined;
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <AdminDashboard searchValue={searchValue} selectedValues={selectedValues} date={date} eventStatus={''} />
      </MockedProvider>
    );
    await waitFor(() => {
      const tableRow = screen.getByTestId('get-events-0');
      expect(tableRow);
    });
  });
  it('should render successfully with event data', async () => {
    const searchValue = '';
    const selectedValues = ['artist'];
    const date = undefined;

    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <AdminDashboard searchValue={searchValue} selectedValues={selectedValues} date={date} eventStatus={''} />
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
        <AdminDashboard searchValue={searchValue} selectedValues={selectedValues} date={date} eventStatus={''} />
      </MockedProvider>
    );
    await waitFor(() => {
      const tableRow = screen.getByTestId('get-events-0');
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
        <AdminDashboard searchValue={searchValue} selectedValues={selectedValues} date={date} eventStatus={''} />
      </MockedProvider>
    );
    await waitFor(() => {
      const tableRow = screen.getByTestId('get-events-0');
      expect(tableRow);
    });
    expect(screen.getByText('2022-01-01'));
  });

  //   const setCurrentPage = jest.fn();
  //   const totalPages = 3;
  //   const searchValue = '';
  //   const selectedValues = [''];
  //   const date = new Date('2022-01-01');

  //   const handlePageChange = (page: number) => {
  //     setCurrentPage(page >= 1 && page <= totalPages ? page : 1);
  //   };
  //   const onPageChange = jest.fn();
  //   const currentPage = 1;

  //   render(
  //     <MockedProvider mocks={[mock]} addTypename={false}>
  //       <AdminDashboard searchValue={searchValue} selectedValues={selectedValues} date={date} currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} eventStatus={''} />
  //     </MockedProvider>
  //   );

  //   // Test a valid page change
  //   handlePageChange(2); // Valid page (within range)
  //   expect(setCurrentPage);

  //   handlePageChange(0);
  //   expect(setCurrentPage);

  //   handlePageChange(4);
  //   expect(setCurrentPage);
  // });
});
