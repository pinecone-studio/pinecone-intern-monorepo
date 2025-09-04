/* eslint-disable max-lines */
/* eslint-disable react/function-component-definition */

import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import UnmatchButton from '@/components/UnmatchButton';

// --- MOCK: Router ---
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// --- MOCK: Button ---
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, className, disabled }) => (
    <button onClick={onClick} className={className} data-variant={variant} disabled={disabled}>
      {children}
    </button>
  ),
}));

// --- MOCK: Dialog (directly inline, not via external variable) ---
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open }) => <div data-open={open}>{children}</div>,
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
}));

// --- MOCK: useUnmatchMutation ---
const mockMutationFn = jest.fn();
jest.mock('@/generated', () => ({
  useUnmatchMutation: jest.fn(() => [mockMutationFn, { loading: false }]),
}));

import { useUnmatchMutation } from '@/generated';

describe('UnmatchButton', () => {
  const matchId = 'test-match-id';
  const mockOnUnmatched = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
    mockMutationFn.mockClear();
    mockOnUnmatched.mockClear();
    useUnmatchMutation.mockImplementation(() => [mockMutationFn, { loading: false }]);
  });

  it('renders unmatch trigger button when matchId provided', () => {
    render(<UnmatchButton matchId="test-match-id" />);
    const triggerButton = screen.getByTestId('unmatch-dialog-trigger');
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
    // Click the trigger button to open the dialog
    fireEvent.click(screen.getByTestId('unmatch-dialog-trigger'));
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Unmatch this person?');
    expect(screen.getByTestId('dialog-description')).toHaveTextContent('If you unmatch, you will not be able to chat with this person again. This action cannot be undone.');
  });

  it('clicking "Keep match" closes the dialog and does not navigate', () => {
    render(<UnmatchButton matchId={matchId} />);
    // Open the dialog by clicking the trigger button explicitly
    fireEvent.click(screen.getByTestId('unmatch-dialog-trigger'));
    // Click 'Keep match' inside the dialog
    fireEvent.click(screen.getByText('Keep match'));
    // Make sure router.push was not called
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('clicking "Unmatch" triggers unmatch mutation and navigates on success', async () => {
    useUnmatchMutation.mockImplementation(({ onCompleted }) => {
      const mutationFn = () => {
        setTimeout(() => {
          onCompleted?.({ unmatch: { success: true, message: 'Done' } });
        }, 0);
      };
      return [mutationFn, { loading: false }];
    });

    render(<UnmatchButton matchId={matchId} onUnmatched={mockOnUnmatched} />);
    fireEvent.click(screen.getByTestId('unmatch-dialog-trigger'));
    const dialog = screen.getByTestId('dialog-content');
    // Find the 'Unmatch' button only inside the dialog
    const confirmButton = within(dialog).getByRole('button', { name: 'Unmatch' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/chat');
      expect(mockOnUnmatched).toHaveBeenCalled();
    });
  });

  it('disables unmatch button and shows loading when loading', () => {
    useUnmatchMutation.mockImplementation(() => [
      () => {
        //intentionally empty
      },
      { loading: true },
    ]);
    render(<UnmatchButton matchId={matchId} />);
    // Open the dialog first
    fireEvent.click(screen.getByTestId('unmatch-dialog-trigger'));
    // Now check for the loading state
    const unmatchButton = screen.getByRole('button', { name: /unmatching.../i });
    expect(unmatchButton).toBeInTheDocument();
    expect(unmatchButton).toBeDisabled();
  });

  it('calls onUnmatched callback when unmatch is successful', async () => {
    useUnmatchMutation.mockImplementation(({ onCompleted }) => {
      const mutationFn = () => {
        setTimeout(() => {
          onCompleted?.({ unmatch: { success: true, message: 'Done' } });
        }, 0);
      };
      return [mutationFn, { loading: false }];
    });

    render(<UnmatchButton matchId={matchId} onUnmatched={mockOnUnmatched} />);
    // Open the dialog
    fireEvent.click(screen.getByTestId('unmatch-dialog-trigger'));
    // Click the Unmatch button inside the dialog
    const dialog = screen.getByTestId('dialog-content');
    const confirmButton = within(dialog).getByRole('button', { name: 'Unmatch' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnUnmatched).toHaveBeenCalled();
    });
  });

  it('logs error when unmatch fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      //intentionally empty
    });
    useUnmatchMutation.mockImplementation(({ onCompleted }) => {
      const mutationFn = () => {
        setTimeout(() => {
          onCompleted?.({ unmatch: { success: false, message: 'Failed to unmatch' } });
        }, 0);
      };
      return [mutationFn, { loading: false }];
    });

    render(<UnmatchButton matchId={matchId} />);
    // Open the dialog
    fireEvent.click(screen.getByTestId('unmatch-dialog-trigger'));
    // Click the Unmatch button inside the dialog
    const dialog = screen.getByTestId('dialog-content');
    const confirmButton = within(dialog).getByRole('button', { name: 'Unmatch' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to unmatch');
      expect(mockPush).not.toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it('logs error when unmatch mutation throws an error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      //intentionally empty
    });
    useUnmatchMutation.mockImplementation(({ onError }) => {
      const mutationFn = () => {
        setTimeout(() => {
          onError?.(new Error('Network error'));
        }, 0);
      };
      return [mutationFn, { loading: false }];
    });

    render(<UnmatchButton matchId={matchId} />);
    // Open the dialog
    fireEvent.click(screen.getByTestId('unmatch-dialog-trigger'));
    // Click the Unmatch button inside the dialog
    const dialog = screen.getByTestId('dialog-content');
    const confirmButton = within(dialog).getByRole('button', { name: 'Unmatch' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Unmatch error:', expect.any(Error));
      expect(mockPush).not.toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
});
