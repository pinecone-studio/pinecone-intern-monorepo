import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminListingTable, { Listing } from '@/app/admin/_components/AdminListingTable';

const mockListings: Listing[] = new Array(4).fill(null).map((_, i) => ({
  id: `${i + 1}`.padStart(4, '0'),
  name: `Хотхон ${i + 1}`,
  owner: `Эзэмшигч ${i + 1}`,
  phone: `9900000${i}`,
  image: '/listingcard.png',
  status: ['Хүсэлт илгээсэн', 'Зөвшөөрсөн', 'Татгалзсан', 'Админ хассан'][i],
}));

describe('AdminListingTable', () => {
  it('renders all tab buttons', () => {
    render(<AdminListingTable listings={mockListings} onSelect={jest.fn()} />);
    expect(screen.getByText('Хүсэлт илгээсэн')).toBeInTheDocument();
    expect(screen.getByText('Зөвшөөрсөн')).toBeInTheDocument();
    expect(screen.getByText('Татгалзсан')).toBeInTheDocument();
    expect(screen.getByText('Админ хассан')).toBeInTheDocument();
  });

  it('filters listings by selected tab', () => {
    render(<AdminListingTable listings={mockListings} onSelect={jest.fn()} />);
    fireEvent.click(screen.getByText('Зөвшөөрсөн'));

    const row = screen.getByText('0002').closest('tr');
    expect(row).toBeInTheDocument();
    expect(screen.getByText('Хотхон 2')).toBeInTheDocument();
  });

  it('calls onSelect when a row is clicked', () => {
    const handleSelect = jest.fn();
    render(<AdminListingTable listings={mockListings} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('0001'));
    expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ id: '0001' }));
  });

  it('renders search input and pagination buttons', () => {
    render(<AdminListingTable listings={mockListings} onSelect={jest.fn()} />);
    expect(screen.getByPlaceholderText('Хайлт')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
    expect(screen.getByText('«')).toBeInTheDocument();
    expect(screen.getByText('‹')).toBeInTheDocument();
    expect(screen.getByText('›')).toBeInTheDocument();
    expect(screen.getByText('»')).toBeInTheDocument();
  });
});
