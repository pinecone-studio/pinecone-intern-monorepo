import UnmatchButton from '@/components/UnmatchButton';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, className }) => (
    <button onClick={onClick} className={className} data-variant={variant}>
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

describe('UnmatchButton', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders unmatch trigger button', () => {
    render(<UnmatchButton />);
    const buttons = screen.getAllByText('Unmatch');
    expect(buttons[0]).toHaveClass('w-[112px]', 'h-[40px]');
  });

  it('renders dialog content', () => {
    render(<UnmatchButton />);
    expect(screen.getByText('Unmatch this person?')).toBeInTheDocument();
    expect(screen.getByText('Keep match')).toBeInTheDocument();
  });

  it('navigates to /chat when keep match clicked', () => {
    render(<UnmatchButton />);
    fireEvent.click(screen.getByText('Keep match'));
    expect(mockPush).toHaveBeenCalledWith('/chat');
  });

  it('has two unmatch buttons (trigger + action)', () => {
    render(<UnmatchButton />);
    expect(screen.getAllByText('Unmatch')).toHaveLength(2);
  });
});
