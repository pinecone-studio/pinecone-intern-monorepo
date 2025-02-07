// HomePageSubCategorySection.test.tsx
import { HomePageSubCategorySection } from '@/components/HomePage/SubCategory';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock the SubCategoryCard component
jest.mock('@/features/card/SubCategorySub', () => ({
  SubCategoryCard: ({ value, title, number }: { value: string; title: string; number: number }) => (
    <div data-testid="sub-category-card">
      <span data-testid="card-value">{value}</span>
      <span data-testid="card-title">{title}</span>
      <span data-testid="card-number">{number}</span>
    </div>
  ),
}));

describe('HomePageSubCategorySection', () => {
  it('should render successfully', () => {
    const { container } = render(<HomePageSubCategorySection />);
    expect(container).toBeInTheDocument();
  });

  it('should render with correct layout classes', () => {
    const { container } = render(<HomePageSubCategorySection />);
    const mainDiv = container.firstChild as HTMLElement;

    expect(mainDiv).toHaveClass('w-full');
    expect(mainDiv).toHaveClass('h-[175px]');
    expect(mainDiv).toHaveClass('max-w-screen-xl');
    expect(mainDiv).toHaveClass('grid');
    expect(mainDiv).toHaveClass('grid-cols-4');
    expect(mainDiv).toHaveClass('gap-4');
  });

  it('should render correct number of SubCategoryCards', () => {
    render(<HomePageSubCategorySection />);
    const cards = screen.getAllByTestId('sub-category-card');
    expect(cards).toHaveLength(4);
  });
});
