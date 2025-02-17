/* eslint-disable */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDeleteFoodMutation, useGetFoodsQuery } from '@/generated';
import '@testing-library/jest-dom';
import AdminFoodPageComp from '@/components/admin-page-comp/AdminFoodPageComp';

// Mock the generated hook
jest.mock('@/generated', () => ({
  useGetFoodsQuery: jest.fn(),
  useCreateFoodMutation: jest.fn(),
  useDeleteFoodMutation: jest.fn(),
}));

jest.mock('@/components/admin-page-comp/AdminFoodDialog', () => ({
  __esModule: true,
  default: () => <div data-testid="admin-food-dialog" />,
}));

// Mock console.error
const mockConsoleError = jest.fn();
console.error = mockConsoleError;

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
  const mockRefetch = jest.fn();
  const mockDeleteFoodMutation = jest.fn();

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
    jest.clearAllMocks();

    (useGetFoodsQuery as jest.Mock).mockReturnValue({
      data: mockFoodData,
      refetch: mockRefetch,
    });

    (useDeleteFoodMutation as jest.Mock).mockReturnValue([mockDeleteFoodMutation]);
  });

  it('renders the component with header', () => {
    render(<AdminFoodPageComp />);
    expect(screen.getByText('Захиалга')).toBeInTheDocument();
  });

  it('renders food items correctly', () => {
    render(<AdminFoodPageComp />);

    expect(screen.getByText('Test Food 1')).toBeInTheDocument();
    expect(screen.getByText('Test Food 2')).toBeInTheDocument();
    expect(screen.getByText('1.5к')).toBeInTheDocument();
    expect(screen.getByText('800')).toBeInTheDocument();
  });

  it('renders edit and delete buttons for each food item', () => {
    render(<AdminFoodPageComp />);
    const deleteButtons = screen.getAllByTestId('delete-button');
    expect(deleteButtons).toHaveLength(2);
  });

  it('renders separator between food items but not after the last item', () => {
    render(<AdminFoodPageComp />);
    const separators = screen.getAllByTestId('separator');
    expect(separators).toHaveLength(mockFoodData.getFoods.length - 1);
  });

  it('formats prices correctly', () => {
    render(<AdminFoodPageComp />);
    expect(screen.getByText('1.5к')).toBeInTheDocument();
  });

  it('should confirm before deleting and call delete mutation & refetch', async () => {
    jest.spyOn(window, 'confirm').mockImplementation(() => true); // Mock confirmation BEFORE click

    render(<AdminFoodPageComp />);

    const deleteButtons = screen.getAllByTestId('delete-button');

    // Click the first delete button (corresponding to food ID '1')
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockDeleteFoodMutation).toHaveBeenCalledWith({ variables: { foodId: '1' } });
    });

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it('should not delete if user cancels', async () => {
    render(<AdminFoodPageComp />);

    // Mock window.confirm to return false (user cancels)
    jest.spyOn(window, 'confirm').mockImplementation(() => false);

    // Click the delete button
    const deleteButtons = screen.getAllByTestId('delete-button');
    fireEvent.click(deleteButtons[1]);

    // Mutation should NOT be called
    expect(mockDeleteFoodMutation).not.toHaveBeenCalled();

    // Refetch should NOT be called
    expect(mockRefetch).not.toHaveBeenCalled();
  });

  it('should handle deletion error correctly', async () => {
    const mockConfirm = jest.fn();
    window.confirm = mockConfirm;

    const mockError = new Error('Failed to delete food');
    const mockDeleteMutation = jest.fn().mockRejectedValue(mockError);
    useDeleteFoodMutation.mockReturnValue([mockDeleteMutation]);

    // Mock confirm to return true
    mockConfirm.mockReturnValue(true);

    // Render the component
    render(<AdminFoodPageComp />);

    const deleteButton = screen.getAllByTestId('delete-button');
    fireEvent.click(deleteButton[0]);

    // Verify confirm was called
    expect(mockConfirm).toHaveBeenCalledWith('Та энэ хоолыг устгахдаа итгэлтэй байна уу?');

    // Wait for and verify error handling
    await waitFor(() => {
      // Verify delete mutation was called with correct arguments
      expect(mockDeleteMutation).toHaveBeenCalledWith({
        variables: { foodId: '1' },
      });

      // Verify error was logged
      expect(mockConsoleError).toHaveBeenCalledWith('Failed to delete food:', mockError);
    });
  });
});
