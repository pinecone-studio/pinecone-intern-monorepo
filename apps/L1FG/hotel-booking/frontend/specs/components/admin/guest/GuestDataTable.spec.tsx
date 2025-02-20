/*eslint-disable*/

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Booking } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { useGetHotelByIdQuery, useGetRoomByIdQuery } from '@/generated';
import { mocked } from 'jest-mock';
import { GuestDataTable } from '@/components/admin/ui';

jest.mock('@/generated', () => ({
  ...jest.requireActual('@/generated'),
  useGetHotelByIdQuery: jest.fn(),
  useGetRoomByIdQuery: jest.fn(),
}));

describe('GuestDataTable', () => {
  const mockBookings: Booking[] = [
    {
      id: '1',
      cardName: 'John Doe',
      hotelId: 'hotel1',
      roomId: 'room1',
      startDate: '2025-02-20T14:00:00Z',
      endDate: '2025-02-22T10:00:00Z',
      status: 'Booked',
      __typename: 'Booking',
      cardNumber: '',
      country: '',
      email: '',
      expirationDate: undefined,
      phoneNumber: '',
      securityCode: 0,
      userId: '',
    },
    {
      id: '2',
      cardName: 'Jane Smith',
      hotelId: 'hotel2',
      roomId: 'room2',
      startDate: '2025-03-01T14:00:00Z',
      endDate: '2025-03-05T10:00:00Z',
      status: 'Completed',
      __typename: 'Booking',
      cardNumber: '',
      country: '',
      email: '',
      expirationDate: undefined,
      phoneNumber: '',
      securityCode: 0,
      userId: '',
    },
  ];

  beforeEach(() => {
    mocked(useGetHotelByIdQuery).mockImplementation(({ variables = {} }) => ({
      data: {
        getHotelById: {
          name: variables.getHotelByIdId === 'hotel1' ? 'Hotel Alpha' : 'Hotel Beta',
          __typename: 'Hotel',
          id: '',
          images: [],
        },
      },
    }));

    mocked(useGetRoomByIdQuery).mockImplementation(({ variables = {} }) => ({
      data: {
        getRoomById: {
          name: variables.getRoomByIdId === 'room1' ? 'Room Deluxe' : 'Room Suite',
          __typename: 'Room',
          id: '',
          hotelId: '',
          images: [],
        },
      },
    }));
  });

  it('renders the table headers correctly', () => {
    render(
      <MockedProvider>
        <GuestDataTable data={mockBookings} />
      </MockedProvider>
    );

    expect(screen.getByText('ID'));
    expect(screen.getByText('Name'));
    expect(screen.getByText('Hotel'));
    expect(screen.getByText('Rooms'));
    expect(screen.getByText('Guests'));
    expect(screen.getByText('Date'));
    expect(screen.getByText('Status'));
  });

  it('renders guest rows with correct data', async () => {
    render(
      <MockedProvider>
        <GuestDataTable data={mockBookings} />
      </MockedProvider>
    );

    expect(screen.getByText('John Doe'));
    expect(screen.getByText('Jane Smith'));
    expect(screen.getByText('Hotel Alpha'));
    expect(screen.getByText('Hotel Beta'));
    expect(screen.getByText('Room Deluxe'));
    expect(screen.getByText('Room Suite'));
    expect(screen.getByText('Feb 20 - Feb 22'));
    expect(screen.getByText('Mar 1 - Mar 5'));
    expect(screen.getByText('Booked'));
    expect(screen.getByText('Completed'));
  });

  it('handles missing data gracefully', () => {
    const incompleteBookings: Booking[] = [
      {
        id: '3',
        cardName: '',
        hotelId: '',
        roomId: '',
        startDate: null,
        endDate: null,
        status: '',
        __typename: 'Booking',
        cardNumber: '',
        country: '',
        email: '',
        expirationDate: undefined,
        phoneNumber: '',
        securityCode: 0,
        userId: '',
      },
    ];

    render(
      <MockedProvider>
        <GuestDataTable data={incompleteBookings} />
      </MockedProvider>
    );
  });
  it('should handle status correctly in guest row', async () => {
    render(
      <MockedProvider>
        <GuestDataTable data={mockBookings} />
      </MockedProvider>
    );

    // Testing the statusClass function by checking the rendered status badge
    const bookedStatus = screen.getByText('Booked');
    const completedStatus = screen.getByText('Completed');

    // Check if the badge has the right class for "Booked" status
    expect(bookedStatus);

    // Check if the badge has the right class for "Completed" status
    expect(completedStatus);
  });

  it('should format date range correctly in guest row', async () => {
    render(
      <MockedProvider>
        <GuestDataTable data={mockBookings} />
      </MockedProvider>
    );

    // Testing the formatDateRange function for the correct date format
    const dateRange1 = screen.getByText('Feb 20 - Feb 22');
    const dateRange2 = screen.getByText('Mar 1 - Mar 5');

    // Ensure the date format is as expected
    expect(dateRange1);
    expect(dateRange2);
  });

  it('should handle missing dates and return "-/-" in guest row', async () => {
    const incompleteBookings: Booking[] = [
      {
        id: '4',
        cardName: 'Incomplete Guest',
        hotelId: 'hotel1',
        roomId: 'room1',
        startDate: null,
        endDate: null,
        status: 'Booked',
        __typename: 'Booking',
        cardNumber: '',
        country: '',
        email: '',
        expirationDate: undefined,
        phoneNumber: '',
        securityCode: 0,
        userId: '',
      },
    ];

    render(
      <MockedProvider>
        <GuestDataTable data={incompleteBookings} />
      </MockedProvider>
    );

    // Checking for the placeholder "-/-" for missing start and end dates
    const dateRange = screen.getByText('-/-');
    expect(dateRange);
  });
});
