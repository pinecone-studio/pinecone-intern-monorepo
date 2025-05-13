import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminListingTable, { Listing } from '@/app/admin/_components/AdminListingTable';

const mockListings: Listing[] = [
  {
    id: '0001',
    name: 'Зар #1',
    owner: 'Н.Мөнхтунгалаг',
    phone: '99112233',
    image: '/listingcard.png',
    status: 'Хүлээгдэж буй',
  },
  {
    id: '0002',
    name: 'Зар #2',
    owner: 'Эзэмшигч 2',
    phone: '99114455',
    image: '/listingcard.png',
    status: 'Зөвшөөрсөн',
  },
];

describe('AdminListingTable', () => {
  it('renders all tab buttons', () => {
    render(<AdminListingTable listings={mockListings} onSelect={jest.fn()} />);
    expect(screen.getByText('Хүлээгдэж буй')).toBeInTheDocument();
    expect(screen.getByText('Зөвшөөрсөн')).toBeInTheDocument();
    expect(screen.getByText('Татгалзсан')).toBeInTheDocument();
    expect(screen.getByText('Админ хассан')).toBeInTheDocument();
  });

  it('filters listings by selected tab', () => {
    render(<AdminListingTable listings={mockListings} onSelect={jest.fn()} />);
    fireEvent.click(screen.getByText('Зөвшөөрсөн'));

    expect(screen.getByText('0002')).toBeInTheDocument();
    expect(screen.queryByText('0001')).not.toBeInTheDocument();
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
  describe('AdminListingTable - Empty State', () => {
    it('shows empty state when no listings match the tab', () => {
      render(<AdminListingTable listings={[]} onSelect={jest.fn()} />);
      expect(screen.getByText('Энэ төлөвт зар алга.')).toBeInTheDocument();
    });
  });
});
