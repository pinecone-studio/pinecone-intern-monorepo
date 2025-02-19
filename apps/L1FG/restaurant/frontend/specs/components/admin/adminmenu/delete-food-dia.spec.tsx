import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDeleteCategoryMutation } from '@/generated';
import { toast } from 'sonner';
import DeleteFoodDia from '@/components/admin-page-comp/DeleteFoodDia';

// Mock the dependencies
jest.mock('@/generated', () => ({
  useDeleteCategoryMutation: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

function createMockPointerEvent(type: string, props: PointerEventInit = {}): PointerEvent {
  const event = new Event(type, props) as PointerEvent;
  Object.assign(event, {
    button: props.button ?? 0,
    ctrlKey: props.ctrlKey ?? false,
    pointerType: props.pointerType ?? 'mouse',
  });
  return event;
}

// Assign the mock function to the global window object
window.PointerEvent = createMockPointerEvent as any;

// Mock HTMLElement methods
Object.assign(window.HTMLElement.prototype, {
  scrollIntoView: jest.fn(),
  releasePointerCapture: jest.fn(),
  hasPointerCapture: jest.fn(),
});

describe('DeleteFoodDia Component', () => {
  const mockFoodId = 'food-123';
  const mockRefetch = jest.fn();
  const mockDeleteMutation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementation
    useDeleteCategoryMutation.mockReturnValue([mockDeleteMutation, { loading: false }]);
  });

  it('renders correctly with trigger button', () => {
    render(<DeleteFoodDia foodId={mockFoodId} refetch={mockRefetch} />);

    expect(screen.getByTestId('trig-btn')).toBeInTheDocument();
    expect(screen.queryByText('Цэснээс хасах')).not.toBeInTheDocument(); // Dialog shouldn't be open initially
  });

  it('opens dialog when trigger button is clicked', () => {
    render(<DeleteFoodDia foodId={mockFoodId} refetch={mockRefetch} />);

    const triggerButton = screen.getByTestId('trig-btn');
    fireEvent.click(triggerButton);

    expect(screen.getByText('Цэснээс хасах')).toBeInTheDocument();
    expect(screen.getByText('Хасахдаа итгэлтэй байна уу')).toBeInTheDocument();
    expect(screen.getByTestId('delete-btn')).toBeInTheDocument();
  });

  it('closes dialog when X button is clicked', () => {
    render(<DeleteFoodDia foodId={mockFoodId} refetch={mockRefetch} />);

    // Open dialog
    const triggerButton = screen.getByTestId('trig-btn');
    fireEvent.click(triggerButton);

    // Close dialog
    const closeButton = screen.getByTestId('close-btn');
    fireEvent.click(closeButton);

    // Dialog should be closed
    expect(screen.queryByText('Цэснээс хасах')).not.toBeInTheDocument();
  });

  it('shows loading state during deletion', async () => {
    // Mock the mutation to return loading state
    useDeleteCategoryMutation.mockReturnValue([mockDeleteMutation, { loading: true }]);

    render(<DeleteFoodDia foodId={mockFoodId} refetch={mockRefetch} />);

    // Open dialog
    fireEvent.click(screen.getByTestId('trig-btn'));

    expect(screen.getByTestId('delete-btn')).toHaveTextContent('Устгаж байна...');
    expect(screen.getByTestId('delete-btn')).toBeDisabled();
  });

  it('calls delete function and refetch on successful deletion', async () => {
    // Mock successful deletion
    mockDeleteMutation.mockResolvedValue({ data: { deleteCategory: { success: true } } });

    render(<DeleteFoodDia foodId={mockFoodId} refetch={mockRefetch} />);

    // Open dialog
    fireEvent.click(screen.getByTestId('trig-btn'));

    // Click delete button
    fireEvent.click(screen.getByTestId('delete-btn'));

    await waitFor(() => {
      // Check mutation was called with correct parameters
      expect(mockDeleteMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            id: mockFoodId,
          },
        },
      });

      // Verify refetch and toast were called
      expect(mockRefetch).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Амжилттай устгалаа!');
    });
  });

  it('handles deletion error correctly', async () => {
    // Mock error during deletion
    const mockError = new Error('Deletion failed');
    mockDeleteMutation.mockRejectedValue(mockError);

    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log');

    render(<DeleteFoodDia foodId={mockFoodId} refetch={mockRefetch} />);

    // Open dialog
    fireEvent.click(screen.getByTestId('trig-btn'));

    // Click delete button
    fireEvent.click(screen.getByTestId('delete-btn'));

    await waitFor(() => {
      // Check error was logged
      expect(consoleSpy).toHaveBeenCalledWith(mockError);

      // Check error toast was shown
      expect(toast.error).toHaveBeenCalledWith('Алдаа гарлаа! Дахин оролдоно уу.');

      // Verify refetch was not called
      expect(mockRefetch).not.toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
