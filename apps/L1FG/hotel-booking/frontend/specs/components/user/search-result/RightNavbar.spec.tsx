import { RightNavbar } from '@/components/user/search-result/RightNavbar';
import { render, screen } from '@testing-library/react';

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]), // Mock хийж байна
}));

const mockData = [
  {
    id: '1',
    name: 'Hotel 1',
    images: [],
  },
  {
    id: '2',
    name: 'Hotel 2',
    images: [],
  },
];

describe('renders hotels correctly and changes price order', () => {
  it('1', () => {
    const setSearchValuePrice = jest.fn();

    render(<RightNavbar data={mockData} setSearchValuePrice={setSearchValuePrice} isLoading={false} />);

    expect(screen.getByText('Hotel 1'));
    expect(screen.getByText('Hotel 2'));
  });

  it('renders the property count correctly', () => {
    render(<RightNavbar data={mockData} setSearchValuePrice={jest.fn()} isLoading={false} />);
    expect(screen.getByTestId('property-count'));
  });

  it('renders skeletons when loading', () => {
    render(<RightNavbar data={[]} setSearchValuePrice={jest.fn()} isLoading={true} />);
  });

  it('renders hotel cards when data is available', () => {
    render(<RightNavbar data={mockData} setSearchValuePrice={jest.fn()} isLoading={false} />);
  });

  it('renders "Not found hotel" message when no data is available', () => {
    render(<RightNavbar data={[]} setSearchValuePrice={jest.fn()} isLoading={false} />);
    expect(screen.getByText('Not found hotel'));
  });
});
