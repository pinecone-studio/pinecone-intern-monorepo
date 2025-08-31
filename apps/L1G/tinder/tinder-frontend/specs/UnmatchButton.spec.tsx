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
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }) => <div>{children}</div>,
  DialogTrigger: ({ children }) => <div>{children}</div>,
  DialogContent: ({ children }) => <div>{children}</div>,
  DialogHeader: ({ children }) => <div>{children}</div>,
  DialogTitle: ({ children }) => <h2>{children}</h2>,
  DialogDescription: ({ children }) => <p>{children}</p>,
  DialogFooter: ({ children }) => <div>{children}</div>,
  DialogClose: ({ children }) => <div>{children}</div>,
}));

const mockMutationFn = jest.fn();

jest.mock('@/generated', () => ({
  useUnmatchMutation: jest.fn(() => [mockMutationFn, { loading: false }]),
}));

import { useUnmatchMutation } from '@/generated';

describe('UnmatchButton', () => {
  const matchId = 'test-match-id';

  beforeEach(() => {
    mockPush.mockClear();
    mockMutationFn.mockClear();
    jest.clearAllMocks();
  });

  it('renders unmatch trigger button when matchId provided', () => {
    render(<UnmatchButton matchId={matchId} />);
    const triggerButton = screen.getAllByText('Unmatch')[0];
    expect(triggerButton).toBeInTheDocument();
    expect(triggerButton).toHaveClass('w-[112px]');
  });

  it('does not render if matchId is null or undefined', () => {
    const { container: container1 } = render(<UnmatchButton matchId={null} />);
    expect(container1).toBeEmptyDOMElement();

    const { container: container2 } = render(<UnmatchButton matchId={undefined} />);
    expect(container2).toBeEmptyDOMElement();
  });

  it('renders dialog content with correct text', () => {
    render(<UnmatchButton matchId={matchId} />);
    expect(screen.getByText('Unmatch this person?')).toBeInTheDocument();
    expect(screen.getByText(/you will not be able to chat/i)).toBeInTheDocument();
    expect(screen.getByText('Keep match')).toBeInTheDocument();
  });

  it('clicking "Keep match" navigates to /chat', () => {
    render(<UnmatchButton matchId={matchId} />);
    fireEvent.click(screen.getByText('Keep match'));
    expect(mockPush).toHaveBeenCalledWith('/chat');
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

    render(<UnmatchButton matchId={matchId} />);
    fireEvent.click(screen.getAllByText('Unmatch')[1]);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/chat');
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
    fireEvent.click(screen.getAllByText('Unmatch')[1]);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Failed');
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
    fireEvent.click(screen.getAllByText('Unmatch')[1]);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Unmatch error:', expect.any(Error));
      expect(window.alert).toHaveBeenCalledWith('Something went wrong. Please try again.');
    });
  });

  it('disables unmatch button and shows loading text when loading', () => {
    useUnmatchMutation.mockImplementation(() => [
      () => {
        //intenionally empty
      },
      { loading: true },
    ]);

    render(<UnmatchButton matchId={matchId} />);

    const unmatchButtons = screen.getAllByRole('button', { name: /unmatching.../i });
    expect(unmatchButtons.length).toBeGreaterThan(0);
    unmatchButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
