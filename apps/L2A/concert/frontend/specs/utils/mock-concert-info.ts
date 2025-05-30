import { Concert } from '@/generated';

export const baseEvent: Concert = {
  id: 'mock-2',
  artistName: 'Жавхлан',
  description: 'Mock description',
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
      id: 'seat-1',
      seats: {
        Backseat: { availableTickets: 100, price: 100000, __typename: 'SeatInfo' },
        VIP: { availableTickets: 50, price: 300000, __typename: 'SeatInfo' },
        Standard: { availableTickets: 150, price: 200000, __typename: 'SeatInfo' },
      },
      __typename: 'SeatData',
    },
  ],
  __typename: 'Concert',
};

export const baseEventNoTicket: Concert = {
  id: 'mock-2',
  artistName: 'Жавхлан',
  description: 'Mock description',
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
      id: 'seat-1',
      seats: {
        Backseat: { availableTickets: 0, price: 0, __typename: 'SeatInfo' },
        VIP: { availableTickets: 0, price: 0, __typename: 'SeatInfo' },
        Standard: { availableTickets: 1, price: 1, __typename: 'SeatInfo' },
      },
      __typename: 'SeatData',
    },
  ],
  __typename: 'Concert',
};

export const mockConcerts: Concert[] = [
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
