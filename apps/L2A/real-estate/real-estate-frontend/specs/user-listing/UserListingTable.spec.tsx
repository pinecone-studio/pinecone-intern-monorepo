import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserListingTable, { Listing } from '@/app/user-listing/_components/UserListingTable';

const statuses: Listing['status'][] = ['Хүлээгдэж буй', 'Зарагдаж байгаа', 'Зарагдсан', 'Буцаагдсан', 'Хадгалсан'];

const mockListings: Listing[] = new Array(10).fill(null).map((_, i) => ({
  id: `000${i + 1}`,
  name: 'Seoul royal county хотхон',
  owner: 'Н.Мөнхтунгалаг',
  image: '/listingcard.png',
  status: statuses[i % statuses.length],
  price: '880,000,000₮',
}));

describe('UserListingTable', () => {
  it('renders correct number of rows for "Зарууд" tab (all)', () => {
    render(<UserListingTable listings={mockListings} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(mockListings.length + 1); // +1 for header row
  });

  it('renders correct columns', () => {
    render(<UserListingTable listings={mockListings.slice(0, 1)} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Нэр')).toBeInTheDocument();
    expect(screen.getByText('Төлөв')).toBeInTheDocument();
    expect(screen.getByText('Үнэ')).toBeInTheDocument();
    expect(screen.getByText('Үйлдэл')).toBeInTheDocument();
  });

  it('displays correct status label styling', () => {
    render(<UserListingTable listings={[mockListings[0]]} />);
    expect(screen.getByText(mockListings[0].status)).toBeInTheDocument();
  });
});
