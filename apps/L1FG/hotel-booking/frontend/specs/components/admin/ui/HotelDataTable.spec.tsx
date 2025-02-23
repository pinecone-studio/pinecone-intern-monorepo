/*eslint-disable*/
import { render, screen, fireEvent } from '@testing-library/react';
import { HotelDataTable } from '@/components/admin/ui';
import { Hotel } from '@/generated';
import '@testing-library/jest-dom';

// Mock next/image since it's used in the component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('HotelDataTable', () => {
  const sampleHotels: Hotel[] = [
    {
      id: '1',
      name: 'Hotel 1',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
      starRating: 5,
      rating: 8.9,
      images: ['hotel1.jpg'],
    },
    {
      id: '2',
      name: 'Hotel 2',
      amenities: ['Gym', 'Restaurant'],
      starRating: 4,
      rating: 7.5,
      images: ['hotel2.jpg'],
    },
  ];

  it('should render the hotel data table with correct number of rows', () => {
    render(<HotelDataTable data={sampleHotels} />);

    expect(screen.getByText('Hotel 1'));
    expect(screen.getByText('Hotel 2'));
    expect(screen.getAllByRole('link'));
  });

  it('should display formatted ID correctly', () => {
    render(<HotelDataTable data={sampleHotels} />);

    expect(screen.getByText('0001'));
    expect(screen.getByText('0002'));
  });

  it('should display amenities correctly and handle overflow', () => {
    render(<HotelDataTable data={sampleHotels} />);

    // Check first hotel's amenities (should show 3 amenities + overflow)
    expect(screen.getByText('Free WiFi'));
    expect(screen.getByText('Pool'));
    expect(screen.getByText('Spa'));
    expect(screen.getByText('+1')); // Overflow indicator

    // Check second hotel's amenities
    expect(screen.getByText('Gym'));
    expect(screen.getByText('Restaurant'));
  });

  it('should display star rating and user rating correctly', () => {
    render(<HotelDataTable data={sampleHotels} />);

    expect(screen.getByText('5'));
    expect(screen.getByText('4'));
    expect(screen.getByText('8.9'));
    expect(screen.getByText('7.5'));
    expect(screen.getAllByText('/10'));
  });

  it('should navigate to correct hotel detail pages', () => {
    render(<HotelDataTable data={sampleHotels} />);

    const links = screen.getAllByRole('link');
    expect(links[0]);
    expect(links[1]);
  });

  describe('Sorting functionality', () => {
    it('should sort by user rating', () => {
      render(<HotelDataTable data={sampleHotels} />);

      const ratingButton = screen.getByText('User Rating').closest('button');
      fireEvent.click(ratingButton!);

      // Ensure sorted in descending order first (8.9 first)

      expect(screen.getByText('8.9'));
      expect(screen.getByText('7.5'));

      // Second click should sort by ascending (7.5 first)
      fireEvent.click(ratingButton!);

      expect(screen.getByText('7.5'));
      expect(screen.getByText('8.9'));
    });

    it('should sort by star rating', () => {
      render(<HotelDataTable data={sampleHotels} />);

      const starsButton = screen.getByText('Stars Rating').closest('button');
      fireEvent.click(starsButton!);

      // First click should sort by descending (5 stars first)

      expect(screen.getByText('5'));
      expect(screen.getByText('4'));

      // Second click should sort by ascending (4 stars first)
      fireEvent.click(starsButton!);

      expect(screen.getByText('4'));
      expect(screen.getByText('5'));
    });

    it('should sort by number of amenities', () => {
      render(<HotelDataTable data={sampleHotels} />);

      const roomsButton = screen.getByText('Rooms').closest('button');
      fireEvent.click(roomsButton!);

      // First click should sort by descending (4 amenities first)

      expect(screen.getByText('Hotel 1')); // Hotel 1 has 4 amenities
      expect(screen.getByText('Hotel 2')); // Hotel 2 has 2 amenities

      // Second click should sort by ascending (2 amenities first)
      fireEvent.click(roomsButton!);

      expect(screen.getByText('Hotel 2'));
      expect(screen.getByText('Hotel 1'));
    });
  });

  const edgeCaseHotels: Hotel[] = [
    {
      id: '1',
      name: 'Hotel 1',
      amenities: ['Free WiFi', 'Pool'],
      starRating: 4,
      rating: null, // rating үгүй
      images: ['hotel1.jpg'],
    },
    {
      id: '2',
      name: 'Hotel 2',
      amenities: null, // amenities үгүй
      starRating: null, // starRating үгүй
      rating: 7.8, // rating байгаа
      images: ['hotel2.jpg'],
    },
    {
      id: '3',
      name: 'Hotel 3',
      amenities: [], // amenities хоосон
      starRating: 3,
      rating: 6.5,
      images: ['hotel3.jpg'],
    },
    {
      id: '4',
      name: 'Hotel 4',
      amenities: null, // amenities хоосон
      starRating: null,
      rating: null,
      images: ['hotel3.jpg'],
    },
  ];

  it('should treat null or undefined rating as 0 when sorting', () => {
    render(<HotelDataTable data={edgeCaseHotels} />);

    const ratingButton = screen.getByText('User Rating').closest('button');
    fireEvent.click(ratingButton!); // Sort in descending order (expect 7.8 first)

    expect(screen.getByText('7.8')); // Hotel 2 has rating 7.8
    expect(screen.getByText('6.5')); // Hotel 3 has rating 6.5
  });

  it('should treat null or undefined starRating as 0 when sorting', () => {
    render(<HotelDataTable data={edgeCaseHotels} />);

    const starsButton = screen.getByText('Stars Rating').closest('button');
    fireEvent.click(starsButton!); // Sort in descending order (expect 4 stars first)

    expect(screen.getByText('4')); // Hotel 1 has starRating 4
    expect(screen.getByText('3')); // Hotel 3 has starRating 3
  });

  it('should treat null or empty amenities as 0 when sorting', () => {
    render(<HotelDataTable data={edgeCaseHotels} />);

    const roomsButton = screen.getByText('Rooms').closest('button');
    fireEvent.click(roomsButton!); // Sort in descending order (expect 2 amenities first)

    expect(screen.getByText('Hotel 1')); // Hotel 1 has 2 amenities
    expect(screen.getByText('Hotel 3')); // Hotel 3 has 0 amenities
    expect(screen.getByText('Hotel 2')); // Hotel 2 has no amenities (treated as 0)
  });
});
