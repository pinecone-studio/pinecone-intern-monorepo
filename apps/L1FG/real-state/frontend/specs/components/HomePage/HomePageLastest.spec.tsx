import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Post } from '@/generated';
import { HomePageLatest } from '@/components/HomePage/HomePageLatest';

// Mock MainCard component
jest.mock('@/features/card', () => ({
  MainCard: ({ value }: { value: Post }) => <div data-testid="main-card">{value.title}</div>,
}));

describe('HomePageLatest Component', () => {
  const mockData: Post[] = [
    { title: 'Post 1' },
    { title: 'Post 2' },
    { title: 'Post 3' },
    { title: 'Post 4' },
    { title: 'Post 5' }, // More than 4 to test slicing
  ] as Post[];

  it('renders correctly with data', () => {
    render(<HomePageLatest data={mockData} />);

    expect(screen.getByText('Сүүлд орсон зарууд')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Цааш үзэх' })).toBeInTheDocument();
    expect(screen.getAllByTestId('main-card')).toHaveLength(4); // Should only render 4 cards
  });

  it('renders correctly when data is undefined', () => {
    render(<HomePageLatest data={undefined} />);
    expect(screen.queryAllByTestId('main-card')).toHaveLength(0);
  });
});
