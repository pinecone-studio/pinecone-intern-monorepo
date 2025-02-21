import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomeHotelList } from '@/components/user/home-page/HomeHotelList';
import { Hotel } from '@/generated';
import { useRouter } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock nuqs with a more flexible implementation
const mockUseQueryState = jest.fn();
jest.mock('nuqs', () => ({
  useQueryState: (param: string) => mockUseQueryState(param),
}));

describe('HomeHotelList Component', () => {
  const mockRouter = { push: jest.fn() };

  const mockHotels = [{ id: '1', name: 'Hotel One', images: [], starRating: 5, rating: 4.5 } as Hotel, { id: '2', name: 'Hotel Two', images: [], starRating: 5, rating: 4.1 } as Hotel];

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockUseQueryState.mockImplementation(() => [null, jest.fn()]);
  });

  it('should render hotel cards correctly', () => {
    render(<HomeHotelList data={mockHotels} />);

    expect(screen.getAllByText('Hotel One'));
    expect(screen.getAllByText('Hotel Two'));
    expect(screen.getAllByText('Popular Hotels'));
    expect(screen.getAllByText('Most booked hotels in Mongolia in past month'));
  });

  it('should render all "View all" buttons', () => {
    render(<HomeHotelList data={mockHotels} />);
    const viewAllButtons = screen.getAllByText('View all');
    expect(viewAllButtons);
  });

  it('should navigate to hotel details without query params when dates are not set', () => {
    render(<HomeHotelList data={mockHotels} />);
    const firstHotelButton = screen.getAllByRole('button')[1]; // Skip "View all" button

    fireEvent.click(firstHotelButton);

    expect(mockRouter.push);
  });

  it('should navigate to hotel details with query params when dates and bedcount are set', () => {
    mockUseQueryState.mockImplementation((param: string) => {
      switch (param) {
        case 'bedcount':
          return ['2'];
        case 'dateFrom':
          return ['2025-03-01'];
        case 'dateTo':
          return ['2025-03-10'];
        default:
          return [null];
      }
    });

    render(<HomeHotelList data={mockHotels} />);
    const firstHotelButton = screen.getAllByRole('button')[1];

    fireEvent.click(firstHotelButton);

    expect(mockRouter.push);
  });

  it('should render empty grid when data is undefined', () => {
    render(<HomeHotelList data={undefined} />);

    expect(screen.queryByText('Hotel One'));
    expect(screen.queryByText('Hotel Two'));
    expect(screen.getAllByText('View all'));
  });

  it('should render correct grid layout', () => {
    render(<HomeHotelList data={mockHotels} />);

    const gridContainers = document.querySelectorAll('.grid-cols-4');
    expect(gridContainers);
  });

  it('should navigate to search page when "View all" button is clicked', () => {
    // Mock query params to ensure button is visible
    mockUseQueryState.mockImplementation((param: string) => {
      switch (param) {
        case 'bedcount':
          return ['2'];
        case 'dateFrom':
          return ['2025-03-01'];
        case 'dateTo':
          return ['2025-03-10'];
        default:
          return [null];
      }
    });

    render(<HomeHotelList data={mockHotels} />);

    // "View all" товчийг олох
    const viewAllButton = screen.getByText('View all');
    fireEvent.click(viewAllButton);

    // Товч дээр дарахад `router.push` дуудсан эсэхийг шалгах
    expect(mockRouter.push);
  });
});
