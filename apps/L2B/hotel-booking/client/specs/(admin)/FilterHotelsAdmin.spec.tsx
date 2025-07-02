import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterHotelsAdmin } from '@/app/(admin)/hotels/_components/FilterHotelsAdmin';
import { Hotel } from '@/generated';

jest.mock('../../src/app/(admin)/_components/SelectFilter', () => ({
  SelectFilter: ({ onValueChange, value, dataTestId }: any) => (
    <select data-testid={dataTestId} value={value} onChange={(e) => onValueChange(e.target.value)}>
      <option value="all">All</option>
      <option value="0">0 Stars</option>
      <option value="1">1 Star</option>
      <option value="2">2 Stars</option>
      <option value="5">5 Stars</option>
      <option value="6">6+ Rating</option>
      <option value="7">7+ Rating</option>
      <option value="8">8+ Rating</option>
      <option value="9">9+ Rating</option>
    </select>
  ),
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(() => ({ data: null, loading: false, error: null })),
}));

describe('FilterHotelsAdmin', () => {
  const mockHotels: Hotel[] = [
    { _id: '1', name: 'Grand Hotel', starRating: 5, rating: 9.2 },
    { _id: '2', name: 'Budget Inn', starRating: 2, rating: 6.5 },
    { _id: '3', name: 'No Stars', starRating: null, rating: 7.0 },
    { _id: '4', name: 'No Rating', starRating: 3, rating: null },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders filter components correctly', () => {
    render(<FilterHotelsAdmin hotels={mockHotels} />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('star-rating-filter')).toBeInTheDocument();
    expect(screen.getByTestId('user-rating-filter')).toBeInTheDocument();
  });

  it('filters hotels by search term', async () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterHotelsAdmin hotels={mockHotels} onFilterChange={mockOnFilterChange} />);
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 'Grand' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: 'Grand Hotel' })]);

    fireEvent.change(searchInput, { target: { value: 'xyz' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith([]);
  });

  it('filters hotels by star rating, covering line 22', async () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterHotelsAdmin hotels={mockHotels} onFilterChange={mockOnFilterChange} />);
    const starFilter = screen.getByTestId('star-rating-filter');

    fireEvent.change(starFilter, { target: { value: 'all' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith(mockHotels);

    fireEvent.change(starFilter, { target: { value: '5' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: 'Grand Hotel' })]);

    fireEvent.change(starFilter, { target: { value: '2' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: 'Budget Inn' })]);

    fireEvent.change(starFilter, { target: { value: '1' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith([]);

    fireEvent.change(starFilter, { target: { value: '0' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: 'No Stars' })]);
  });

  it('filters hotels by user rating', async () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterHotelsAdmin hotels={mockHotels} onFilterChange={mockOnFilterChange} />);
    const ratingFilter = screen.getByTestId('user-rating-filter');

    fireEvent.change(ratingFilter, { target: { value: 'all' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith(mockHotels);

    fireEvent.change(ratingFilter, { target: { value: '8' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: 'Grand Hotel' })]);

    fireEvent.change(ratingFilter, { target: { value: '7' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: 'Grand Hotel' }), expect.objectContaining({ name: 'No Stars' })]);

    fireEvent.change(ratingFilter, { target: { value: '9' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: 'Grand Hotel' })]);
  });

  it('combines multiple filters', async () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterHotelsAdmin hotels={mockHotels} onFilterChange={mockOnFilterChange} />);
    const searchInput = screen.getByTestId('search-input');
    const starFilter = screen.getByTestId('star-rating-filter');
    const ratingFilter = screen.getByTestId('user-rating-filter');

    fireEvent.change(searchInput, { target: { value: 'Grand' } });
    fireEvent.change(starFilter, { target: { value: '5' } });
    fireEvent.change(ratingFilter, { target: { value: '8' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: 'Grand Hotel' })]);

    fireEvent.change(searchInput, { target: { value: 'xyz' } });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnFilterChange).toHaveBeenLastCalledWith([]);
  });
});
