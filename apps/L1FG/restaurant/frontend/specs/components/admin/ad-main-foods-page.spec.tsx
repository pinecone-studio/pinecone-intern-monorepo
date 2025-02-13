import { render, screen } from '@testing-library/react';
import { useGetFoodsQuery } from '@/generated';
import '@testing-library/jest-dom';
import AdminFoodPageComp from '@/components/admin-page-comp/AdminFoodPageComp';

// Mock the generated hook
jest.mock('@/generated', () => ({
  useGetFoodsQuery: jest.fn()
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

jest.mock('@/components/ui/separator', () => ({
  Separator: () => <hr data-testid="separator" />,
}));

describe('AdminFoodPageComp', () => {
  const mockFoodData = {
    getFoods: [
      {
        id: '1',
        foodName: 'Test Food 1',
        price: 1500,
        status: 'Available',
        imageUrl: '/test-image-1.jpg',
      },
      {
        id: '2',
        foodName: 'Test Food 2',
        price: 800,
        status: 'Out of Stock',
        imageUrl: '/test-image-2.jpg',
      },
    ],
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the component with header', () => {
    (useGetFoodsQuery as jest.Mock).mockReturnValue({ data: { getFoods: [] } });
    render(<AdminFoodPageComp />);

    expect(screen.getByText('Захиалга')).toBeInTheDocument();
  });

  it('renders food items correctly', () => {
    (useGetFoodsQuery as jest.Mock).mockReturnValue({ data: mockFoodData });
    render(<AdminFoodPageComp />);

    // Check if food names are rendered
    expect(screen.getByText('Test Food 1')).toBeInTheDocument();
    expect(screen.getByText('Test Food 2')).toBeInTheDocument();

    // Check if prices are formatted correctly
    expect(screen.getByText('1.5к')).toBeInTheDocument();
    expect(screen.getByText('800')).toBeInTheDocument();

    // Check if statuses are rendered
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('renders edit and delete buttons for each food item', () => {
    (useGetFoodsQuery as jest.Mock).mockReturnValue({ data: mockFoodData });
    render(<AdminFoodPageComp />);

    // Since we have 2 food items and each has both edit and delete buttons
    const deleteButtons = screen.getAllByTestId('delete-button');
    expect(deleteButtons).toHaveLength(4); // 2 edit + 2 delete buttons
  });

  it('renders separator between food items but not after the last item', () => {
    (useGetFoodsQuery as jest.Mock).mockReturnValue({ data: mockFoodData });
    render(<AdminFoodPageComp />);

    // Find all separators using test id
    const separators = screen.getAllByTestId('separator');
    // Should have one less separator than the number of items
    expect(separators).toHaveLength(mockFoodData.getFoods.length - 1);
  });
  it('formats prices correctly', () => {
    (useGetFoodsQuery as jest.Mock).mockReturnValue({
      data: {
        getFoods: [
          {
            id: '1',
            foodName: 'Test Food',
            price: 1500,
            status: 'Available',
            imageUrl: '/test-image.jpg',
          },
        ],
      },
    });

    render(<AdminFoodPageComp />);
    expect(screen.getByText('1.5к')).toBeInTheDocument();
  });


});