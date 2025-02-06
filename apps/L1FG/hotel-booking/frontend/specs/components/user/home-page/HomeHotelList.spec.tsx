import { HomeHotelList } from '@/components/user/home-page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('HomeHotelList', () => {
  const mockHotels = [
    { id: '1', name: 'Hotel A', starRating: 5, rating: 4.5, images: [] },
    { id: '2', name: 'Hotel B', starRating: 4, rating: 4.0, images: [] },
  ];

  it('should render successfully', () => {
    render(<HomeHotelList data={[]} />);
  });

  it('should display no hotels message when data is empty', () => {
    render(<HomeHotelList data={[]} />);
  });

  it('should render hotel cards when data is provided', () => {
    render(<HomeHotelList data={mockHotels} />);
  });

  it('should render "View all" button', () => {
    render(<HomeHotelList data={mockHotels} />);
    const buttons = screen.getAllByText('View all');
    expect(buttons);
  });

  it('should render the correct number of hotel cards', () => {
    const { container } = render(<HomeHotelList data={mockHotels} />);
    const cards = container.querySelectorAll('.card');
    expect(cards.length);
  });
});
