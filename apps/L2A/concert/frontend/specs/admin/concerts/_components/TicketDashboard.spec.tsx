import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import TicketDashboard from '@/app/admin/concerts/_components/TicketDashboard';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { Concert, ConcertsDocument } from '@/generated';
import { GraphQLError } from 'graphql';

const mockConcerts: Concert[] = [
  {
    id: 'mock-1',
    artistName: 'Жавхлан',
    description: 'Тур mock data',
    doorOpen: '18:30',
    musicStart: '19:00',
    primaryPrice: 10000,
    specialGuestName: null,
    endDate: '2025-06-18',
    thumbnailUrl: '',
    title: 'Mock Concert 1',
    featured: true,
    venue: {
      id: 'venue-1',
      name: 'UB Palace',
      address: 'UB street',
      city: 'Ulaanbaatar',
      capacity: 1000,
      __typename: 'Venue',
    },
    seatData: [
      {
        date: '2025-01-01',
        id: 'deez',
        seats: {
          Backseat: { availableTickets: 100, price: 100000, __typename: 'SeatInfo' },
          VIP: { availableTickets: 50, price: 300000, __typename: 'SeatInfo' },
          Standard: { availableTickets: 150, price: 200000, __typename: 'SeatInfo' },
          __typename: 'SeatCategories',
        },
        __typename: 'SeatData',
      },
    ],
    __typename: 'Concert',
  },
  {
    id: 'mock-2',
    artistName: 'Жавхлан',
    description: 'Тур mock data',
    doorOpen: '18:30',
    musicStart: '19:00',
    primaryPrice: 10000,
    specialGuestName: null,
    endDate: '2025-06-18',
    thumbnailUrl: '',
    title: 'Mock Concert 2',
    featured: false,
    venue: {
      id: 'venue-1',
      name: 'UB Palace',
      address: 'UB street',
      city: 'Ulaanbaatar',
      capacity: 1000,
      __typename: 'Venue',
    },
    seatData: [
      {
        date: '2025-01-01',
        id: 'deez-2',
        seats: {
          Backseat: { availableTickets: 100, price: 100000, __typename: 'SeatInfo' },
          VIP: { availableTickets: 50, price: 300000, __typename: 'SeatInfo' },
          Standard: { availableTickets: 150, price: 200000, __typename: 'SeatInfo' },
          __typename: 'SeatCategories',
        },
        __typename: 'SeatData',
      },
    ],
    __typename: 'Concert',
  },
];

const mocks = [
  {
    request: { query: ConcertsDocument },
    result: { data: { concerts: mockConcerts } },
  },
];

const mockError = [
  {
    request: { query: ConcertsDocument },
    error: new GraphQLError('failed'),
  },
];
describe('TicketDashboard Component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'prompt').mockImplementation(() => 'Шинэ нэр');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render all initial rows', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <TicketDashboard />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('row-0')).toBeInTheDocument();
      expect(screen.getByTestId('row-1')).toBeInTheDocument();
    });
    const pagination = screen.getByTestId('page-btn-1');
    fireEvent.click(pagination);
  });

  it('should throw an eror', async () => {
    render(
      <MockedProvider mocks={mockError} addTypename={false}>
        <TicketDashboard />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/failed/i)).toBeInTheDocument();
    });
  });
});
