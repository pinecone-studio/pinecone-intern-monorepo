import '@testing-library/jest-dom';
import { Card } from '@/components/ticketCard/Card';
import { act, fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// Mock the useRouter hook and track the push function
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

const card = {
  _id: 'jdwhfg37',
  concertName: 'Coldplay live',
  concertPlan: 'Coldplay',
  artistName: ['Coldplay'], // Changed to an array of strings
  concertDay: '2025-01-31',
  concertTime: '20:00',
  concertPhoto: 'https://example.com/coldplay.jpg', // Changed to an absolute URL
  vipTicket: { price: 120, quantity: 50 },
  regularTicket: { price: 60, quantity: 100 },
  standingAreaTicket: { price: 40, quantity: 200 },
};

describe('Card Component', () => {
  it('should render the concert details correctly', () => {
    const { getByTestId, getByText } = render(<Card card={card} />);

    expect(getByTestId('card-container')).toBeInTheDocument();
    expect(getByTestId('card-concert-name')).toHaveTextContent('Coldplay live');
    expect(getByTestId('card-artist-name')).toHaveTextContent('Coldplay');
    expect(getByTestId('card-format-date')).toHaveTextContent('1-31'); // Formatted date (M-d)
    expect(getByText('Төв цэнгэлдэх')).toBeInTheDocument();
  });

  it('should navigate to the correct detail page when clicked', async () => {
    const { getByTestId } = render(<Card card={card} />);
    const cardContainer = getByTestId('card-container');

    await act(async () => {
      fireEvent.click(cardContainer);
    });

    expect(mockPush).toHaveBeenCalledWith(`/detail/${card._id}`);
  });
});
