import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UnmatchButton from '@/components/UnmatchButton';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, className, disabled }) => (
    <button onClick={onClick} className={className} data-variant={variant} disabled={disabled}>
      {children}
    </button>
  ),
}));

// Create a mock implementation that doesn't use React in the factory
const mockDialogComponents = {
  Dialog: ({ children, open, onOpenChange }) => {
    // We'll use a simple implementation that doesn't require React hooks
    return <div data-open={open}>{children}</div>;
  },
  DialogTrigger: ({ children, setOpen }) => (
    <div onClick={() => setOpen && setOpen(true)} data-testid="dialog-trigger">
      {children}
    </div>
  ),
  DialogContent: ({ children }) => <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({ children }) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }) => <h2 data-testid="dialog-title">{children}</h2>,
  DialogDescription: ({ children }) => <p data-testid="dialog-description">{children}</p>,
  DialogFooter: ({ children }) => <div data-testid="dialog-footer">{children}</div>,
  DialogClose: ({ children }) => <div data-testid="dialog-close">{children}</div>,
};

jest.mock('@/components/ui/dialog', () => mockDialogComponents);

const mockMutationFn = jest.fn();
jest.mock('@/generated', () => ({
  useUnmatchMutation: jest.fn(() => [mockMutationFn, { loading: false }]),
}));

import { useUnmatchMutation } from '@/generated';

describe('UnmatchButton', () => {
  const matchId = 'test-match-id';
  const mockOnUnmatched = jest.fn();

  beforeEach(() => {
    mockPush.mockClear();
    mockMutationFn.mockClear();
    mockOnUnmatched.mockClear();
    jest.clearAllMocks();

    // Reset the mock implementation
    useUnmatchMutation.mockImplementation(() => [mockMutationFn, { loading: false }]);
  });

  it('renders unmatch trigger button when matchId provided', () => {
    render(<UnmatchButton matchId={matchId} />);
    const triggerButton = screen.getByText('Unmatch');
    expect(triggerButton).toBeInTheDocument();
    expect(triggerButton).toHaveClass('text-red-600');
  });

  it('does not render if matchId is null or undefined', () => {
    const { container: container1 } = render(<UnmatchButton matchId={null} />);
    expect(container1).toBeEmptyDOMElement();
    const { container: container2 } = render(<UnmatchButton matchId={undefined} />);
    expect(container2).toBeEmptyDOMElement();
  });

  it('renders dialog content with correct text when dialog is opened', () => {
    render(<UnmatchButton matchId={matchId} />);

    // Initially dialog content should not be visible
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();

    // Click the trigger button to open the dialog
    fireEvent.click(screen.getByText('Unmatch'));

    // Now dialog content should be visible
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Unmatch this person?');
    expect(screen.getByTestId('dialog-description')).toHaveTextContent(/you will not be able to chat/i);
    expect(screen.getByText('Keep match')).toBeInTheDocument();
  });

  it('clicking "Keep match" closes the dialog and does not navigate', () => {
    render(<UnmatchButton matchId={matchId} />);

    // Open the dialog
    fireEvent.click(screen.getByText('Unmatch'));

    // Click "Keep match"
    fireEvent.click(screen.getByText('Keep match'));

    // Should not navigate
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('clicking "Unmatch" triggers unmatch mutation and navigates on success', async () => {
    useUnmatchMutation.mockImplementation(({ onCompleted }) => {
      const mutationFn = () => {
        setTimeout(() => {
          onCompleted && onCompleted({ unmatch: { success: true, message: 'Done' } });
        }, 0);
      };
      return [mutationFn, { loading: false }];
    });

    render(<UnmatchButton matchId={matchId} onUnmatched={mockOnUnmatched} />);

    // Open the dialog
    fireEvent.click(screen.getByText('Unmatch'));

    // Click "Unmatch" in the dialog (second instance)
    fireEvent.click(screen.getAllByText('Unmatch')[1]);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/chat');
      expect(mockOnUnmatched).toHaveBeenCalled();
    });
  });

  it('shows alert with message when unmatch fails but does not throw', async () => {
    window.alert = jest.fn();
    useUnmatchMutation.mockImplementation(({ onCompleted }) => {
      const mutationFn = () => {
        setTimeout(() => {
          onCompleted && onCompleted({ unmatch: { success: false, message: 'Failed' } });
        }, 0);
      };
      return [mutationFn, { loading: false }];
    });

    render(<UnmatchButton matchId={matchId} />);

    // Open the dialog
    fireEvent.click(screen.getByText('Unmatch'));

    // Click "Unmatch" in the dialog
    fireEvent.click(screen.getAllByText('Unmatch')[1]);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Failed');
      // Should not navigate
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('shows alert on unmatch mutation error', async () => {
    window.alert = jest.fn();
    console.error = jest.fn();
    useUnmatchMutation.mockImplementation(({ onError }) => {
      const mutationFn = () => {
        setTimeout(() => {
          onError && onError(new Error('Network error'));
        }, 0);
      };
      return [mutationFn, { loading: false }];
    });

    render(<UnmatchButton matchId={matchId} />);

    // Open the dialog
    fireEvent.click(screen.getByText('Unmatch'));

    // Click "Unmatch" in the dialog
    fireEvent.click(screen.getAllByText('Unmatch')[1]);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Unmatch error:', expect.any(Error));
      expect(window.alert).toHaveBeenCalledWith('Something went wrong. Please try again.');
      // Should not navigate
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('disables unmatch button and shows loading text when loading', () => {
    useUnmatchMutation.mockImplementation(() => [() => {}, { loading: true }]);

    render(<UnmatchButton matchId={matchId} />);

    // Open the dialog
    fireEvent.click(screen.getByText('Unmatch'));

    // Check that the unmatch button is disabled and shows loading text
    const unmatchButton = screen.getByRole('button', { name: /unmatching.../i });
    expect(unmatchButton).toBeInTheDocument();
    expect(unmatchButton).toBeDisabled();
  });

  it('calls onUnmatched callback when unmatch is successful', async () => {
    const mockOnUnmatched = jest.fn();
    useUnmatchMutation.mockImplementation(({ onCompleted }) => {
      const mutationFn = () => {
        setTimeout(() => {
          onCompleted && onCompleted({ unmatch: { success: true, message: 'Done' } });
        }, 0);
      };
      return [mutationFn, { loading: false }];
    });

    render(<UnmatchButton matchId={matchId} onUnmatched={mockOnUnmatched} />);

    // Open the dialog
    fireEvent.click(screen.getByText('Unmatch'));

    // Click "Unmatch" in the dialog
    fireEvent.click(screen.getAllByText('Unmatch')[1]);

    await waitFor(() => {
      expect(mockOnUnmatched).toHaveBeenCalled();
    });
  });
});
