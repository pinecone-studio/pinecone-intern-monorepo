/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useCreateCategoryMutation } from '@/generated';
import { toast } from 'sonner';
import MenuAdd from '@/components/admin-page-comp/adminmenupage/MenuAdd';

// Mock the generated hooks
jest.mock('@/generated', () => ({
  useCreateCategoryMutation: jest.fn(),
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

describe('MenuAdd Component', () => {
  const mockRefetch = jest.fn();
  const mockCreateMutation = jest.fn().mockResolvedValue({});

  beforeEach(() => {
    useCreateCategoryMutation.mockReturnValue([mockCreateMutation, { loading: false }]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the add button correctly', () => {
    render(<MenuAdd refetch={mockRefetch} />);

    const addButton = screen.getByText('Цэс');
    expect(addButton).toBeInTheDocument();
  });

  test('opens dialog when button is clicked', async () => {
    render(<MenuAdd refetch={mockRefetch} />);

    // Click the button to open dialog
    const button = screen.getByText('Цэс');
    fireEvent.click(button);

    // Check if dialog content is visible
    await waitFor(() => {
      expect(screen.getByText('Цэс нэмэх')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ангиллын нэр')).toBeInTheDocument();
    });
  });

  test('updates category name state when input changes', async () => {
    const user = userEvent.setup();
    render(<MenuAdd refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByText('Цэс'));

    // Type in the input field
    const input = screen.getByPlaceholderText('Ангиллын нэр');
    await user.type(input, 'New Category');

    // Check if input value is updated
    expect(input).toHaveValue('New Category');
  });

  test('calls create mutation with input value when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<MenuAdd refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByText('Цэс'));

    // Type in the input field
    const input = screen.getByPlaceholderText('Ангиллын нэр');
    await user.type(input, 'New Category');

    // Click add button
    await user.click(screen.getByText('Нэмэх'));

    // Check if mutation was called with correct params
    expect(mockCreateMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          categoryName: 'New Category',
        },
      },
    });

    // Check if refetch was called
    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Амжилттай нэмэгдлээ!');
    });
  });

  test('shows loading state when mutation is in progress', async () => {
    // Mock loading state
    useCreateCategoryMutation.mockReturnValue([mockCreateMutation, { loading: true }]);

    render(<MenuAdd refetch={mockRefetch} />);

    // Open dialog
    fireEvent.click(screen.getByText('Цэс'));

    // Check if button shows loading text and is disabled
    const button = screen.getByText('Нэмэж байна...');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('handles error when mutation fails', async () => {
    const mockError = new Error('Create failed');
    const mockFailedMutation = jest.fn().mockRejectedValue(mockError);

    useCreateCategoryMutation.mockReturnValue([mockFailedMutation, { loading: false }]);

    // Spy on console.log
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const user = userEvent.setup();
    render(<MenuAdd refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByText('Цэс'));

    // Type in the input field
    await user.type(screen.getByPlaceholderText('Ангиллын нэр'), 'Test Category');

    // Click add button
    await user.click(screen.getByText('Нэмэх'));

    // Check if error toast was shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Алдаа гарлаа! Дахин оролдоно уу.');
      expect(console.log).toHaveBeenCalledWith(mockError);
    });
  });

  test('closes dialog when X button is clicked', async () => {
    const user = userEvent.setup();
    render(<MenuAdd refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByText('Цэс'));

    // Find and click X button
    const closeButton = screen.getByRole('button', { name: '' });
    await user.click(closeButton);

    // Check if dialog is closed
    await waitFor(() => {
      expect(screen.queryByText('Цэс нэмэх')).not.toBeInTheDocument();
    });
  });

  test('does not call create mutation when dialog is closed without submitting', async () => {
    const user = userEvent.setup();
    render(<MenuAdd refetch={mockRefetch} />);

    // Open dialog
    await user.click(screen.getByText('Цэс'));

    // Type in the input field
    await user.type(screen.getByPlaceholderText('Ангиллын нэр'), 'Abandoned Category');

    // Close dialog without clicking add
    const closeButton = screen.getByRole('button', { name: '' });
    await user.click(closeButton);

    // Verify mutation was not called
    expect(mockCreateMutation).not.toHaveBeenCalled();
    expect(mockRefetch).not.toHaveBeenCalled();
  });

  test('resets input field when dialog is reopened', async () => {
    const user = userEvent.setup();
    render(<MenuAdd refetch={mockRefetch} />);

    // First open
    await user.click(screen.getByText('Цэс'));
    await user.type(screen.getByPlaceholderText('Ангиллын нэр'), 'Test Category');
    await user.click(screen.getByRole('button', { name: '' })); // Close dialog

    // Reopen dialog
    await user.click(screen.getByText('Цэс'));

    // Check if input is empty (note: this may fail if your component doesn't reset the state)
    // This test is to verify the ideal behavior - you may need to update your component
    const input = screen.getByPlaceholderText('Ангиллын нэр');
    expect(input).toHaveValue('');
  });
});
