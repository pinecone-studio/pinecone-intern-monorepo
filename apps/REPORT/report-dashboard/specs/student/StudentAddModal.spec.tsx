import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CustomToast, CustomToastError, StudentAddModal } from '../../src/app/student/_components/StudentAddModal';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';

// Mock the hooks and modules
jest.mock('@/generated', () => ({
  useCreateStudentMutation: jest.fn(() => [jest.fn(), { loading: false, error: undefined }]),
  useGetStudentByClassIdQuery: jest.fn(() => ({ refetch: jest.fn() })),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => null,
}));

jest.mock('../../src/app/student/_components/UploadImage', () => ({
  __esModule: true,
  default: ({ onChange }) => <button onClick={() => onChange('https://example.com/image.jpg')}>Upload Image</button>,
}));

describe('StudentAddModal', () => {
  const mockOnOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal content when open', () => {
    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} />);
    expect(screen.getByTestId('add-student-modal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Сурагчийн Нэр, Код ...')).toBeInTheDocument();
  });

  it('does not render the modal content when closed', () => {
    render(<StudentAddModal open={false} onOpenChange={mockOnOpenChange} />);
    expect(screen.queryByTestId('openModalButton')).not.toBeInTheDocument();
  });

  it('renders all input fields', () => {
    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} />);
    expect(screen.getByTestId('student-code-input')).toBeInTheDocument();
    expect(screen.getByTestId('lastName-input')).toBeInTheDocument();
    expect(screen.getByTestId('firstName-input')).toBeInTheDocument();
    expect(screen.getByTestId('phone-number-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  it('renders the radio group for active status', () => {
    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByTestId('active-radio-group-item')).toBeInTheDocument();
    expect(screen.getByTestId('passive-radio-group-item')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} />);

    fireEvent.click(screen.getByTestId('add-student-button'));

    await waitFor(() => {
      expect(screen.getAllByText(/.*оруулна уу$/)).toHaveLength(5);
    });
  });

  it('submits the form with valid data and closes modal', async () => {
    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} />);

    fireEvent.change(screen.getByTestId('student-code-input'), { target: { value: '12345' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('phone-number-input'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });

    fireEvent.click(screen.getByTestId('passive-radio-group-item'));

    await act(async () => {
      fireEvent.click(screen.getByTestId('add-student-button'));
    });

    await waitFor(() => {
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it('changes active status when radio button is clicked', async () => {
    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} />);

    expect(screen.getByText('Идэвхитэй').closest('div')).toHaveClass('bg-slate-200');
    expect(screen.getByText('Идэвхгүй').closest('div')).toHaveClass('bg-white');

    fireEvent.click(screen.getByTestId('passive-radio-group-item'));

    expect(screen.getByText('Идэвхитэй').closest('div')).toHaveClass('bg-white');
    expect(screen.getByText('Идэвхгүй').closest('div')).toHaveClass('bg-slate-200');
  });

  it('displays uploaded image when image is selected', async () => {
    render(
      <MockedProvider>
        <StudentAddModal open={true} onOpenChange={jest.fn()} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText('Upload Image'));

    await waitFor(() => {
      expect(screen.getByTestId('student-profile-image')).toBeInTheDocument();
    });
  });

  it('displays success toast on successful submission', async () => {
    const { toast } = require('sonner');
    const { useCreateStudentMutation } = require('../../src/generated');
    useCreateStudentMutation.mockImplementation(() => [jest.fn().mockResolvedValue({})]);

    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} />);

    fireEvent.change(screen.getByTestId('student-code-input'), { target: { value: '12345' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('phone-number-input'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });

    await act(async () => {
      fireEvent.click(screen.getByTestId('add-student-button'));
    });

    expect(toast.success).toHaveBeenCalledWith(expect.anything());
  });

  it('displays error toast on submission failure', async () => {
    const { toast } = require('sonner');
    const { useCreateStudentMutation } = require('../../src/generated');
    useCreateStudentMutation.mockImplementation(() => [jest.fn().mockRejectedValue(new Error('Submission failed'))]);

    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} />);

    fireEvent.change(screen.getByTestId('student-code-input'), { target: { value: '12345' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('phone-number-input'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });

    await act(async () => {
      fireEvent.click(screen.getByTestId('add-student-button'));
    });

    expect(toast.error).toHaveBeenCalledWith(expect.anything());
  });
});

describe('CustomToast and CustomToastError components', () => {
  test('CustomToast renders with correct message and data-cy attribute', () => {
    const message = 'Test message';
    render(<CustomToast message={message} />);

    const toastElement = screen.getByText(message);
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveAttribute('data-cy', 'toast-message');
  });

  test('CustomToastError renders with correct message and data-cy attribute', () => {
    const errorMessage = 'Error message';
    render(<CustomToastError message={errorMessage} />);

    const toastErrorElement = screen.getByText(errorMessage);
    expect(toastErrorElement).toBeInTheDocument();
    expect(toastErrorElement).toHaveAttribute('data-cy', 'toast-message-error');
  });
});
