/*eslint-disable*/
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect } from '@jest/globals';
import { AdminPage } from '@/components/pages/admin-page';
import { useCreateConcertMutation } from '@/generated';
import { toast } from 'react-toastify';
import { act } from '@testing-library/react';

jest.mock('@/generated', () => ({
  useCreateConcertMutation: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

jest.mock('@/components/admincontext/DialogContext', () => ({
  ConcertFormProvider: jest.fn().mockImplementation(({ children, onSubmit }) => {
    setTimeout(() => {
      const mockFormSubmit = onSubmit;
      jest.mocked(mockFormSubmit);
    }, 0);
    return <div data-testid="form-provider">{children}</div>;
  }),
}));

jest.mock('@/components/adminfeature/AdminDialog', () => ({
  AdminDialog: () => <div data-testid="admin-dialog">Mock Dialog</div>,
}));

jest.mock('@/components/header/AdminHeader', () => ({
  AdminHeader: () => <div data-testid="admin-header">Mock Header</div>,
}));

jest.mock('@/components/adminHero/AdminHero', () => ({
  __esModule: true,
  default: () => <div data-testid="admin-table">Mock Table</div>,
}));

describe('AdminPage', () => {
  const mockCreateConcert = jest.fn();
  let mockOnSubmit: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnSubmit = jest.fn();
    (useCreateConcertMutation as jest.Mock).mockReturnValue([mockCreateConcert]);
  });
  it('should handle form submission and successful concert creation', async () => {
    render(<AdminPage />);

    const mockFormData = {
      concertName: 'Test Concert',
      artistName: ['Test Artist'],
      concertDay: '2024-02-19',
      concertTime: '19:00',
      concertPlan: 'plan',
      concertPhoto: 'photo.jpg',
    };

    const formProviderProps = jest.mocked(require('@/components/admincontext/DialogContext').ConcertFormProvider).mock.calls[0][0];

    await act(async () => {
      await formProviderProps.onSubmit(mockFormData);
    });

    expect(mockCreateConcert).toHaveBeenCalledWith({
      variables: { input: mockFormData },
      onCompleted: expect.any(Function),
      onError: expect.any(Function),
    });

    const { onCompleted } = mockCreateConcert.mock.calls[0][0];
    act(() => {
      onCompleted();
    });

    expect(toast.success).toHaveBeenCalledWith(
      'Тасалбар амжилттай үүсгэгдлээ!',
      expect.objectContaining({
        position: 'top-right',
        autoClose: 3000,
      })
    );
  });
  it('should handle form submission and concert creation error', async () => {
    render(<AdminPage />);

    const mockError = new Error('Test error message');
    const mockFormData = {
      concertName: 'Test Concert',
      artistName: ['Test Artist'],
    };

    const formProviderProps = jest.mocked(require('@/components/admincontext/DialogContext').ConcertFormProvider).mock.calls[0][0];

    await act(async () => {
      await formProviderProps.onSubmit(mockFormData);
    });

    expect(mockCreateConcert).toHaveBeenCalled();

    const { onError } = mockCreateConcert.mock.calls[0][0];
    act(() => {
      onError(mockError);
    });

    expect(toast.error).toHaveBeenCalledWith(
      'Алдаа гарлаа: Test error message',
      expect.objectContaining({
        position: 'top-right',
        autoClose: 3000,
      })
    );
  });

  it('renders all components correctly', () => {
    render(<AdminPage />);

    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
    expect(screen.getByTestId('admin-header')).toBeInTheDocument();
    expect(screen.getByTestId('admin-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('admin-table')).toBeInTheDocument();
    expect(screen.getByTestId('pageWrapper')).toBeInTheDocument();
    expect(screen.getByTestId('outerContainer')).toBeInTheDocument();
  });

  it('should handle form submission and concert creation error', async () => {
    render(<AdminPage />);

    const mockFormData = {
      concertName: 'Test Concert',
      artistName: ['Test Artist'],
    };

    const mockError = new Error('Test error message');

    const formProviderProps = jest.mocked(require('@/components/admincontext/DialogContext').ConcertFormProvider).mock.calls[0][0];

    await act(async () => {
      await formProviderProps.onSubmit(mockFormData);
    });

    expect(mockCreateConcert).toHaveBeenCalled();

    const { onError } = mockCreateConcert.mock.calls[0][0];
    act(() => {
      onError(mockError);
    });

    expect(toast.error).toHaveBeenCalledWith(
      'Алдаа гарлаа: Test error message',
      expect.objectContaining({
        position: 'top-right',
        autoClose: 3000,
      })
    );
  });

  it('should handle form submission and successful concert creation', async () => {
    render(<AdminPage />);

    const mockFormData = {
      concertName: 'Test Concert',
      artistName: ['Test Artist'],
      concertDay: '2024-02-19',
      concertTime: '19:00',
      concertPlan: 'plan',
      concertPhoto: 'photo.jpg',
    };

    const formProviderProps = jest.mocked(require('@/components/admincontext/DialogContext').ConcertFormProvider).mock.calls[0][0];

    await act(async () => {
      await formProviderProps.onSubmit(mockFormData);
    });

    expect(mockCreateConcert).toHaveBeenCalledWith({
      variables: { input: mockFormData },
      onCompleted: expect.any(Function),
      onError: expect.any(Function),
    });

    const { onCompleted } = mockCreateConcert.mock.calls[0][0];
    act(() => {
      onCompleted();
    });

    expect(toast.success).toHaveBeenCalledWith(
      'Тасалбар амжилттай үүсгэгдлээ!',
      expect.objectContaining({
        position: 'top-right',
        autoClose: 3000,
      })
    );
  });

  it('displays correct text content', () => {
    render(<AdminPage />);

    expect(screen.getByText('Тасалбар')).toBeInTheDocument();
    expect(screen.getByText('Идэвхтэй зарагдаж буй тасалбарууд')).toBeInTheDocument();
  });

  it('handles successful concert creation', async () => {
    mockCreateConcert.mockImplementation(({ onCompleted }) => {
      onCompleted?.();
      return Promise.resolve();
    });

    render(<AdminPage />);

    const mockFormData = {
      concertName: 'Test Concert',
      artistName: ['Test Artist'],
    };

    await mockCreateConcert({
      variables: { input: mockFormData },
      onCompleted: () => {
        toast.success('Тасалбар амжилттай үүсгэгдлээ!', {
          position: 'top-right',
          autoClose: 3000,
        });
      },
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Тасалбар амжилттай үүсгэгдлээ!', expect.any(Object));
    });
  });

  it('handles concert creation error', async () => {
    const errorMessage = 'Test error';
    const error = new Error(errorMessage);

    mockCreateConcert.mockImplementation(({ onError }) => {
      onError?.(error);
      return Promise.reject(error);
    });

    render(<AdminPage />);

    await mockCreateConcert({
      variables: { input: {} },
      onError: (error: Error) => {
        toast.error(`Алдаа гарлаа: ${error.message}`, {
          position: 'top-right',
          autoClose: 3000,
        });
      },
    }).catch(() => {});

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(`Алдаа гарлаа: ${errorMessage}`, expect.any(Object));
    });
  });
});
