/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useRealDeleteCategoryMutation } from '@/generated';
import { toast } from 'sonner';
import DeleteCateDia from '@/components/admin-page-comp/adminmenupage/DeleteCateDia';

// Mock the generated hooks
jest.mock('@/generated', () => ({
  useRealDeleteCategoryMutation: jest.fn(),
}));

// Mock the sonner toast
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

describe('DeleteCateDia Component', () => {
  const mockRefetch = jest.fn();
  const mockCateId = 'category123';
  const mockDeleteMutation = jest.fn().mockResolvedValue({});

  beforeEach(() => {
    useRealDeleteCategoryMutation.mockReturnValue([mockDeleteMutation, { loading: false }]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the delete button correctly', () => {
    render(<DeleteCateDia cateId={mockCateId} refetch={mockRefetch} />);

    const deleteButton = screen.getByTestId('delete-button');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.querySelector('svg')).toBeInTheDocument(); // Check if the Trash icon is rendered
  });

  test('opens dialog when delete button is clicked', async () => {
    render(<DeleteCateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Click the button to open dialog
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    // Check if dialog content is visible
    await waitFor(() => {
      expect(screen.getByText('Цэс устгах')).toBeInTheDocument();
      expect(screen.getByText('Устгахдаа итгэлтэй байна уу')).toBeInTheDocument();
    });
  });

  test('calls delete mutation when confirm button is clicked', async () => {
    const user = userEvent.setup();
    render(<DeleteCateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByTestId('delete-button'));

    // Click confirm button
    await user.click(screen.getByText('устгах'));

    // Check if mutation was called with correct params
    expect(mockDeleteMutation).toHaveBeenCalledWith({
      variables: {
        deleteCategoryId: mockCateId,
      },
    });

    // Check if refetch was called
    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Амжилттай устгалаа!');
    });
  });

  test('shows loading state when mutation is in progress', async () => {
    // Mock loading state
    useRealDeleteCategoryMutation.mockReturnValue([mockDeleteMutation, { loading: true }]);

    render(<DeleteCateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Open dialog
    fireEvent.click(screen.getByTestId('delete-button'));

    // Check if button shows loading text
    expect(screen.getByText('Устгаж байна...')).toBeInTheDocument();
    expect(screen.getByText('Устгаж байна...')).toBeDisabled();
  });

  test('handles error when mutation fails', async () => {
    const mockError = new Error('Delete failed');
    const mockFailedMutation = jest.fn().mockRejectedValue(mockError);

    useRealDeleteCategoryMutation.mockReturnValue([mockFailedMutation, { loading: false }]);

    const user = userEvent.setup();
    render(<DeleteCateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByTestId('delete-button'));

    // Click confirm button
    await user.click(screen.getByText('устгах'));

    // Check if error toast was shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Алдаа гарлаа! Дахин оролдоно уу.');
    });

    // Verify console.log was called with the error
  });

  test('closes dialog when X button is clicked', async () => {
    const user = userEvent.setup();
    render(<DeleteCateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByTestId('delete-button'));

    // Find and click X button
    const closeButton = screen.getByRole('button', { name: '' });
    await user.click(closeButton);

    // Check if dialog is closed
    await waitFor(() => {
      expect(screen.queryByText('Цэс устгах')).not.toBeInTheDocument();
    });
  });

  test('does not call delete mutation when dialog is closed', async () => {
    const user = userEvent.setup();
    render(<DeleteCateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByTestId('delete-button'));

    // Close dialog without clicking delete
    await user.click(screen.getByRole('button', { name: '' }));

    // Verify mutation was not called
    expect(mockDeleteMutation).not.toHaveBeenCalled();
    expect(mockRefetch).not.toHaveBeenCalled();
  });
});
