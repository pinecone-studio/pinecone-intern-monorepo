/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useUpdateCategoryNameMutation } from '@/generated';
import { toast } from 'sonner';
import CateUpdateDia from '@/components/admin-page-comp/adminmenupage/UpdateCateDia';
import '@testing-library/jest-dom';
// Mock the generated hooks
jest.mock('@/generated', () => ({
  useUpdateCategoryNameMutation: jest.fn(),
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

describe('CateUpdateDia Component', () => {
  const mockRefetch = jest.fn();
  const mockCateId = 'category123';
  const mockUpdateMutation = jest.fn().mockResolvedValue({});

  beforeEach(() => {
    useUpdateCategoryNameMutation.mockReturnValue([mockUpdateMutation, { loading: false }]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the update button correctly', () => {
    render(<CateUpdateDia cateId={mockCateId} refetch={mockRefetch} />);

    const updateButton = screen.getByTestId('delete-button');
    expect(updateButton).toBeInTheDocument();
    expect(updateButton.querySelector('svg')).toBeInTheDocument(); // Check if the Pencil icon is rendered
  });

  test('opens dialog when update button is clicked', async () => {
    render(<CateUpdateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Click the button to open dialog
    const updateButton = screen.getByTestId('delete-button');
    fireEvent.click(updateButton);

    // Check if dialog content is visible
    await waitFor(() => {
      expect(screen.getByText('Цэс шинэчлэх')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ангиллын нэр')).toBeInTheDocument();
    });
  });

  test('updates category name state when input changes', async () => {
    const user = userEvent.setup();
    render(<CateUpdateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByTestId('delete-button'));

    // Type in the input field
    const input = screen.getByPlaceholderText('Ангиллын нэр');
    await user.type(input, 'Updated Category');

    // Check if input value is updated
    expect(input).toHaveValue('Updated Category');
  });

  test('calls update mutation with input value when update button is clicked', async () => {
    const user = userEvent.setup();
    render(<CateUpdateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByTestId('delete-button'));

    // Type in the input field
    const input = screen.getByPlaceholderText('Ангиллын нэр');
    await user.type(input, 'Updated Category');

    // Click update button
    await user.click(screen.getByText('Шинэчлэх'));

    // Check if mutation was called with correct params
    expect(mockUpdateMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          categoryName: 'Updated Category',
          id: mockCateId,
        },
      },
    });

    // Check if refetch was called
    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Амжилттай шинэчлэгдлээ!');
    });
  });

  test('shows loading state when mutation is in progress', async () => {
    // Mock loading state
    useUpdateCategoryNameMutation.mockReturnValue([mockUpdateMutation, { loading: true }]);

    render(<CateUpdateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Open dialog
    fireEvent.click(screen.getByTestId('delete-button'));

    // Check if button shows loading text
    expect(screen.getByText('Шинэчлэж байна...')).toBeInTheDocument();
    expect(screen.getByText('Шинэчлэж байна...')).toBeDisabled();
  });

  test('handles error when mutation fails', async () => {
    const mockError = new Error('Update failed');
    const mockFailedMutation = jest.fn().mockRejectedValue(mockError);

    useUpdateCategoryNameMutation.mockReturnValue([mockFailedMutation, { loading: false }]);

    // Spy on console.log
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const user = userEvent.setup();
    render(<CateUpdateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByTestId('delete-button'));

    // Type in the input field
    await user.type(screen.getByPlaceholderText('Ангиллын нэр'), 'Test Category');

    // Click update button
    await user.click(screen.getByText('Шинэчлэх'));

    // Check if error toast was shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Алдаа гарлаа! Дахин оролдоно уу.');
      expect(console.log).toHaveBeenCalledWith(mockError);
    });
  });

  test('closes dialog when X button is clicked', async () => {
    const user = userEvent.setup();
    render(<CateUpdateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByTestId('delete-button'));

    // Find and click X button
    const closeButton = screen.getByRole('button', { name: '' });
    await user.click(closeButton);

    // Check if dialog is closed
    await waitFor(() => {
      expect(screen.queryByText('Цэс шинэчлэх')).not.toBeInTheDocument();
    });
  });

  test('does not call update mutation when dialog is closed without submitting', async () => {
    const user = userEvent.setup();
    render(<CateUpdateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByTestId('delete-button'));

    // Type in the input field
    await user.type(screen.getByPlaceholderText('Ангиллын нэр'), 'Abandoned Update');

    // Close dialog without clicking update
    const closeButton = screen.getByRole('button', { name: '' });
    await user.click(closeButton);

    // Verify mutation was not called
    expect(mockUpdateMutation).not.toHaveBeenCalled();
    expect(mockRefetch).not.toHaveBeenCalled();
  });

  test('resets input field when dialog is reopened', async () => {
    const user = userEvent.setup();
    render(<CateUpdateDia cateId={mockCateId} refetch={mockRefetch} />);

    // First open
    await user.click(screen.getByTestId('delete-button'));
    await user.type(screen.getByPlaceholderText('Ангиллын нэр'), 'Test Category');
    await user.click(screen.getByRole('button', { name: '' })); // Close dialog

    // Reopen dialog
    await user.click(screen.getByTestId('delete-button'));

    // Check if input is empty
    const input = screen.getByPlaceholderText('Ангиллын нэр');
    expect(input).toHaveValue('');
  });

  test('does not submit when input is empty', async () => {
    const user = userEvent.setup();
    render(<CateUpdateDia cateId={mockCateId} refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByTestId('delete-button'));

    // Click update button without typing anything
    await user.click(screen.getByText('Шинэчлэх'));

    // Check mutation was called with empty string
    expect(mockUpdateMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          categoryName: '',
          id: mockCateId,
        },
      },
    });
  });
});
