import { render, screen } from '@testing-library/react';
import { Hotel } from '@/generated';
import { HotelDataTable } from '@/components/admin/ui';
import '@testing-library/jest-dom';

describe('HotelDataTable', () => {
  const sampleHotels: Hotel[] = [
    {
      id: '1',
      name: 'Hotel 1',
      amenities: ['Free WiFi', 'Pool'],
      starRating: 5,
      rating: 8.9,
      images: ['try'],
    },
    {
      id: '2',
      name: 'Hotel 2',
      amenities: ['Gym', 'Restaurant'],
      starRating: 4,
      rating: 7.5,
      images: ['try'],
    },
  ];

  it('should render the hotel data table with correct number of rows', () => {
    render(<HotelDataTable data={sampleHotels} />);

    // Check if the table renders the hotels
    expect(screen.getByText('Hotel 1')).toBeInTheDocument();
    expect(screen.getByText('Hotel 2')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(sampleHotels.length); // Assuming each hotel is wrapped in a Link component
  });

  it('should display formatted ID correctly', () => {
    render(<HotelDataTable data={sampleHotels} />);

    const firstHotelId = screen.getByText('0001'); // Ensure it's in the format with 4 digits
    const secondHotelId = screen.getByText('0002');

    expect(firstHotelId).toBeInTheDocument();
    expect(secondHotelId).toBeInTheDocument();
  });

  it('should display amenities correctly', () => {
    render(<HotelDataTable data={sampleHotels} />);

    // Check if amenities are correctly displayed
    expect(screen.getByText('Free WiFi')).toBeInTheDocument();
    expect(screen.getByText('Pool')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
  });

  it('should display star rating correctly', () => {
    render(<HotelDataTable data={sampleHotels} />);

    // Check if star rating is rendered
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('should navigate to hotel detail page on link click', () => {
    render(<HotelDataTable data={sampleHotels} />);

    // Check if link is present and points to the correct route
    const hotelLink = screen.getByText('Hotel 1');
    expect(hotelLink.closest('a')).toHaveAttribute('href', '/admin/hotel-detail/1');
  });
});
