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
  const mockClassId = 'class123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal content when open', () => {
    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} classId={mockClassId} />);
    expect(screen.getByTestId('add-student-modal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Сурагчийн Нэр, Код ...')).toBeInTheDocument();
  });

  it('does not render the modal content when closed', () => {
    render(<StudentAddModal open={false} onOpenChange={mockOnOpenChange} classId={mockClassId} />);
    expect(screen.queryByTestId('openModalButton')).not.toBeInTheDocument();
  });

  it('renders all input fields', () => {
    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} classId={mockClassId} />);
    expect(screen.getByTestId('student-code-input')).toBeInTheDocument();
    expect(screen.getByTestId('lastName-input')).toBeInTheDocument();
    expect(screen.getByTestId('firstName-input')).toBeInTheDocument();
    expect(screen.getByTestId('phone-number-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  it('renders the radio group for active status', () => {
    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} classId={mockClassId} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByTestId('active-radio-group-item')).toBeInTheDocument();
    expect(screen.getByTestId('passive-radio-group-item')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} classId={mockClassId} />);

    fireEvent.click(screen.getByTestId('add-student-button'));

    await waitFor(() => {
      expect(screen.getAllByText(/.*оруулна уу$/)).toHaveLength(5);
    });
  });

  it('submits the form with valid data and closes modal', async () => {
    const mockCreateStudent = jest.fn().mockResolvedValue({});
    jest.spyOn(require('@/generated'), 'useCreateStudentMutation').mockReturnValue([mockCreateStudent]);

    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} classId={mockClassId} />);

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
      expect(mockCreateStudent).toHaveBeenCalledWith({
        variables: {
          input: {
            studentCode: '12345',
            lastName: 'Doe',
            firstName: 'John',
            phoneNumber: '1234567890',
            email: 'john@example.com',
            profileImgUrl: '',
            active: 'PASSIVE',
            classId: mockClassId,
          },
        },
      });
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it('changes active status when radio button is clicked', async () => {
    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} classId={mockClassId} />);

    const activeRadio = screen.getByTestId('active-radio-group-item');
    const passiveRadio = screen.getByTestId('passive-radio-group-item');

    expect(activeRadio.parentElement).toHaveClass('bg-slate-200');
    expect(passiveRadio.parentElement).toHaveClass('bg-white');

    fireEvent.click(passiveRadio);

    expect(activeRadio.parentElement).toHaveClass('bg-white');
    expect(passiveRadio.parentElement).toHaveClass('bg-slate-200');
  });

  it('displays uploaded image when image is selected', async () => {
    render(
      <MockedProvider>
        <StudentAddModal open={true} onOpenChange={mockOnOpenChange} classId={mockClassId} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText('Upload Image'));

    await waitFor(() => {
      expect(screen.getByTestId('student-profile-image')).toBeInTheDocument();
    });
  });

  it('displays success toast on successful submission', async () => {
    const { toast } = require('sonner');
    const mockCreateStudent = jest.fn().mockResolvedValue({});
    jest.spyOn(require('@/generated'), 'useCreateStudentMutation').mockReturnValue([mockCreateStudent]);

    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} classId={mockClassId} />);

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
    const mockCreateStudent = jest.fn().mockRejectedValue(new Error('Submission failed'));
    jest.spyOn(require('@/generated'), 'useCreateStudentMutation').mockReturnValue([mockCreateStudent]);

    render(<StudentAddModal open={true} onOpenChange={mockOnOpenChange} classId={mockClassId} />);

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
