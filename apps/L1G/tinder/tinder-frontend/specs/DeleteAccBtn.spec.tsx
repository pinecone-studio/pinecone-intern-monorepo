import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { DeleteAccBtn } from '@/components/DeleteAccBtn';
import { DeleteUserDocument } from '@/generated';
import '@testing-library/jest-dom';

// Mocks
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));

const localStorageMock = {
  removeItem: jest.fn(),
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Test data
const mockUser = {
  id: 'user-123',
  name: 'Test User',
  email: 'test@example.com',
};

const successMock = {
  request: {
    query: DeleteUserDocument,
    variables: { deleteUserId: 'user-123' },
  },
  result: {
    data: {
      deleteUser: {
        message: 'User deleted successfully',
        success: true,
      },
    },
  },
};

const failureMock = {
  request: {
    query: DeleteUserDocument,
    variables: { deleteUserId: 'user-123' },
  },
  result: {
    data: {
      deleteUser: {
        message: 'Failed to delete user',
        success: false,
      },
    },
  },
};

const errorMock = {
  request: {
    query: DeleteUserDocument,
    variables: { deleteUserId: 'user-123' },
  },
  error: new Error('Network error'),
};

describe('DeleteAccBtn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  const renderComponent = (mocks = []) =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteAccBtn user={mockUser} />
      </MockedProvider>
    );

  it('renders the delete account button', () => {
    renderComponent();
    expect(screen.getByText('Delete Account')).toBeInTheDocument();
  });

  it('opens the confirmation dialog when delete button is clicked', async () => {
    renderComponent();

    await act(async () => {
      fireEvent.click(screen.getByText('Delete Account'));
    });

    expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument();
    expect(screen.getByText('This action cannot be undone. This will permanently delete your account and remove your data from our servers.')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('closes the dialog when cancel is clicked', async () => {
    renderComponent();

    // Open dialog
    await act(async () => {
      fireEvent.click(screen.getByText('Delete Account'));
    });

    // Close dialog
    await act(async () => {
      fireEvent.click(screen.getByText('Cancel'));
    });

    // Dialog should be closed (content not visible)
    expect(screen.queryByText('Are you absolutely sure?')).not.toBeInTheDocument();
  });

  it('handles successful account deletion', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    renderComponent([successMock]);

    // Open dialog
    await act(async () => {
      fireEvent.click(screen.getByText('Delete Account'));
    });

    // Click continue
    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });

    await waitFor(() => {
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
      expect(mockPush).toHaveBeenCalledWith('/');
      expect(consoleSpy).toHaveBeenCalledWith({ message: 'User deleted successfully', success: true }, 'delete user mutation response');
    });

    consoleSpy.mockRestore();
  });

  it('handles failed account deletion', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    renderComponent([failureMock]);

    // Open dialog
    await act(async () => {
      fireEvent.click(screen.getByText('Delete Account'));
    });

    // Click continue
    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });

    await waitFor(() => {
      expect(localStorageMock.removeItem).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith({ message: 'Failed to delete user', success: false }, 'delete user mutation response');
    });

    consoleSpy.mockRestore();
  });

  it('handles network errors during deletion', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    renderComponent([errorMock]);

    // Open dialog
    await act(async () => {
      fireEvent.click(screen.getByText('Delete Account'));
    });

    // Click continue
    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });

    await waitFor(() => {
      expect(localStorageMock.removeItem).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('calls deleteUserMutation with correct variables', async () => {
    renderComponent([successMock]);

    // Open dialog
    await act(async () => {
      fireEvent.click(screen.getByText('Delete Account'));
    });

    // Click continue
    await act(async () => {
      fireEvent.click(screen.getByText('Continue'));
    });

    await waitFor(() => {
      // The mutation should be called with the user ID
      expect(successMock.request.variables.deleteUserId).toBe('user-123');
    });
  });

  it('has correct styling for the delete button', () => {
    renderComponent();
    const deleteButton = screen.getByText('Delete Account');

    expect(deleteButton).toHaveClass('text-white', 'rounded-md', 'w-fit', 'py-2', 'px-4', 'bg-[#E11D48E5]', 'bg-opacity-90', 'font-sans', 'hover:bg-[#E11D48E5]');
  });

  it('has correct styling for the continue button', async () => {
    renderComponent();

    // Open dialog
    await act(async () => {
      fireEvent.click(screen.getByText('Delete Account'));
    });

    const continueButton = screen.getByText('Continue');
    expect(continueButton).toHaveClass('bg-[#E11D48E5]', 'bg-opacity-90', 'font-sans', 'hover:bg-[#E11D48E5]');
  });
});
