import HeroComponent from '@/components/detail/HeroComponent';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetConcertDocument } from '@/generated';
import { render, screen, waitFor } from '@testing-library/react';
import { format } from 'date-fns';
import '@testing-library/jest-dom';

jest.mock('date-fns', () => ({
  format: jest.fn().mockImplementation(() => '05.05'),
}));

const getConcertMock: MockedResponse = {
  request: { query: GetConcertDocument, variables: { id: '1' } },
  result: {
    data: {
      getConcert: {
        _id: '1',
        artistName: ['Ella Harmony', 'Smooth Jazz Trio'],
        concertDay: '2025-05-05T00:00:00.000Z',
        concertName: 'Jazz Under the Stars',
        concertPhoto: 'https://example.com/concerts/jazz-stars.jpg',
        concertPlan: 'A relaxing evening with smooth jazz performances.',
        concertTime: '18:00',
        regularTicket: {
          price: 60,
          quantity: 180,
        },
        standingAreaTicket: {
          price: 40,
          quantity: 50,
        },
        vipTicket: {
          price: 120,
          quantity: 40,
        },
      },
    },
  },
};

describe('Test', () => {
  it('should display concert data after successful fetch', async () => {
    render(
      <MockedProvider mocks={[getConcertMock]} addTypename={false}>
        <HeroComponent ticketID="1" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Jazz Under the Stars')).toBeInTheDocument();
      expect(screen.getByText('Ella Harmony')).toBeInTheDocument();
      expect(screen.getByText('05.05')).toBeInTheDocument();
    });
  });
  it('should format concert date correctly', async () => {
    render(
      <MockedProvider mocks={[getConcertMock]} addTypename={false}>
        <HeroComponent ticketID="1" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(format).toHaveBeenCalledWith('2025-05-05T00:00:00.000Z', 'MM.dd');
    });
  });
});
