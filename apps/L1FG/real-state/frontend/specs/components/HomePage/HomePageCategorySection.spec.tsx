import { render, screen } from '@testing-library/react';
import { Categories } from '@/constants/constant';
import '@testing-library/jest-dom';
import { HomePageCategorySection } from '@/components/HomePage/HomePageCategorySection';

jest.mock('@/features/card/SubCategorySub', () => ({
  SubCategoryCard: jest.fn(() => <div data-testid="subcategory-card" />),
}));

describe('HomePageCategorySection Component', () => {
  test('renders the section with title and categories', () => {
    render(<HomePageCategorySection />);

    // Check if the title is rendered
    expect(screen.getByText('Барилгын төрлөөр')).toBeInTheDocument();

    // Check if the "Цааш үзэх" link is rendered
    expect(screen.getByRole('link', { name: 'Цааш үзэх' })).toBeInTheDocument();

    // Check if the correct number of SubCategoryCards is rendered
    expect(screen.getAllByTestId('subcategory-card')).toHaveLength(Categories.length);
  });
});
