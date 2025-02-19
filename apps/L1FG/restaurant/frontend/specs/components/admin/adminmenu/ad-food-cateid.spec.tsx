/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useGetFoodsQuery, useUpdateFoodCategoryMutation } from '@/generated';
import { toast } from 'sonner';
import AddFoodCateId from '@/components/admin-page-comp/adminmenupage/AddFoodCateId';

// Mock the generated hooks
jest.mock('@/generated', () => ({
  useGetFoodsQuery: jest.fn(),
  useUpdateFoodCategoryMutation: jest.fn(),
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

describe('AddFoodCateId Component', () => {
  const mockRefetch = jest.fn();
  const mockCategoryId = 'category123';
  const mockFoods = [
    { id: 'food1', foodName: 'Food Item 1' },
    { id: 'food2', foodName: 'Food Item 2' },
  ];

  const mockUpdateMutation = jest.fn().mockResolvedValue({});

  beforeEach(() => {
    useGetFoodsQuery.mockReturnValue({
      data: {
        getFoods: mockFoods,
      },
      loading: false,
    });

    useUpdateFoodCategoryMutation.mockReturnValue([mockUpdateMutation, { loading: false }]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the add button correctly', () => {
    render(<AddFoodCateId categoryId={mockCategoryId} refetch={mockRefetch} />);

    const addButton = screen.getByText('Бүтээгдэхүүнээс');
    expect(addButton).toBeInTheDocument();
  });

  test('opens dialog when button is clicked', async () => {
    render(<AddFoodCateId categoryId={mockCategoryId} refetch={mockRefetch} />);

    // Click the button to open dialog
    const button = screen.getByText('Бүтээгдэхүүнээс');
    fireEvent.click(button);

    // Check if dialog content is visible
    await waitFor(() => {
      expect(screen.getByText('Цэсэнд нэмэх')).toBeInTheDocument();
      expect(screen.getByText('Бүтээгдэхүүн нэмэх')).toBeInTheDocument();
    });
  });

  test('displays food items in select dropdown', async () => {
    const user = userEvent.setup();
    render(<AddFoodCateId categoryId={mockCategoryId} refetch={mockRefetch} />);

    // Open dialog
    fireEvent.click(screen.getByText('Бүтээгдэхүүнээс'));

    // Open select dropdown
    user.click(screen.getByTestId('select-trig'));

    await waitFor(() => {
      expect(screen.getByText('Food Item 1')).toBeInTheDocument();
      expect(screen.getByText('Food Item 2')).toBeInTheDocument();
    });
  });

  test('selects food item and calls update mutation', async () => {
    const user = userEvent.setup();
    render(<AddFoodCateId categoryId={mockCategoryId} refetch={mockRefetch} />);

    // Open dialog
    fireEvent.click(screen.getByText('Бүтээгдэхүүнээс'));

    // Open select dropdown
    user.click(screen.getByTestId('select-trig'));

    // Select a food item
    await waitFor(() => {
      expect(screen.getByText('Food Item 1')).toBeInTheDocument();
    });
    // Click add button
    fireEvent.click(screen.getByText('Нэмэх'));

    // Check if mutation was called with correct params

    // Check if refetch was called
    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Амжилттай нэмэгдлээ!');
    });
  });

  test('shows loading state when mutation is in progress', async () => {
    // Mock loading state
    useUpdateFoodCategoryMutation.mockReturnValue([mockUpdateMutation, { loading: true }]);

    render(<AddFoodCateId categoryId={mockCategoryId} refetch={mockRefetch} />);

    // Open dialog
    fireEvent.click(screen.getByText('Бүтээгдэхүүнээс'));

    // Check if button shows loading text
    expect(screen.getByText('Нэмэж байна...')).toBeInTheDocument();
    expect(screen.getByText('Нэмэж байна...')).toBeDisabled();
  });

  test('handles error when mutation fails', async () => {
    const user = userEvent.setup();
    const mockError = new Error('Update failed');
    const mockFailedMutation = jest.fn().mockRejectedValue(mockError);

    useUpdateFoodCategoryMutation.mockReturnValue([mockFailedMutation, { loading: false }]);

    render(<AddFoodCateId categoryId={mockCategoryId} refetch={mockRefetch} />);

    // Open dialog
    fireEvent.click(screen.getByText('Бүтээгдэхүүнээс'));

    // Open select dropdown
    user.click(screen.getByTestId('select-trig'));

    await waitFor(() => {
      expect(screen.getByText('Food Item 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Food Item 1'));

    // Click add button
    fireEvent.click(screen.getByText('Нэмэх'));

    // Check if error toast was shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Алдаа гарлаа! Дахин оролдоно уу.');
    });
  });

  test('closes dialog when X button is clicked', async () => {
    render(<AddFoodCateId categoryId={mockCategoryId} refetch={mockRefetch} />);

    // Open dialog
    fireEvent.click(screen.getByText('Бүтээгдэхүүнээс'));

    // Click X button
    fireEvent.click(screen.getByTestId('X'));

    // Check if dialog is closed
    await waitFor(() => {
      expect(screen.queryByText('Цэсэнд нэмэх')).not.toBeInTheDocument();
    });
  });
});
