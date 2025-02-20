import { RightNavbar } from '@/components/user/search-result/RightNavbar';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

const mockData = [
  { id: '1', name: 'Hotel 1', images: [] },
  { id: '2', name: 'Hotel 2', images: [] },
];

describe('RightNavbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('navigates to hotel detail with query params when dateFrom and dateTo are provided', () => {
    // ✅ Mock query params with actual values
    (useQueryState as jest.Mock).mockImplementation((param: string) => {
      switch (param) {
        case 'bedcount':
          return ['2', jest.fn()];
        case 'dateFrom':
          return ['2025-03-01', jest.fn()];
        case 'dateTo':
          return ['2025-03-10', jest.fn()];
        default:
          return [null, jest.fn()];
      }
    });

    render(<RightNavbar data={mockData} setSearchValuePrice={jest.fn()} isLoading={false} />);

    const hotelButton = screen.getAllByRole('button')[1];
    fireEvent.click(hotelButton);

    expect(mockPush);
  });

  it('navigates to hotel detail without query params when dateFrom and dateTo are null', () => {
    (useQueryState as jest.Mock).mockImplementation((_param: string) => {
      return [null, jest.fn()];
    });

    render(<RightNavbar data={mockData} setSearchValuePrice={jest.fn()} isLoading={false} />);

    const hotelButton = screen.getAllByRole('button')[1];
    fireEvent.click(hotelButton);

    expect(mockPush);
  });

  it('navigates to hotel detail without query params when dateFrom and dateTo are null', () => {
    render(<RightNavbar data={mockData} setSearchValuePrice={jest.fn()} isLoading={true} />);
    expect(mockPush);
  });
});
