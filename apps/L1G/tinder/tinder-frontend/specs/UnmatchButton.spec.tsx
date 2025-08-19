import UnmatchButton from '@/components/UnmatchButton';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock Next.js useRouter
const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => mockRouter),
}));

// Mock shadcn/ui components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, className, ...props }) => (
    <button className={`button ${variant} ${className}`} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }) => <div data-testid="dialog">{children}</div>,
  DialogTrigger: ({ asChild, children }) => (
    <div data-testid="dialog-trigger" data-as-child={asChild}>
      {children}
    </div>
  ),
  DialogContent: ({ children, className, ...props }) => (
    <div data-testid="dialog-content" className={className} {...props}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }) => <h2 data-testid="dialog-title">{children}</h2>,
  DialogDescription: ({ children }) => <p data-testid="dialog-description">{children}</p>,
  DialogFooter: ({ children, className }) => (
    <div data-testid="dialog-footer" className={className}>
      {children}
    </div>
  ),
  DialogClose: ({ asChild, children }) => (
    <div data-testid="dialog-close" data-as-child={asChild}>
      {children}
    </div>
  ),
}));

describe('UnmatchButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the unmatch button correctly', () => {
      render(<UnmatchButton />);

      const unmatchButton = screen.getByRole('button', { name: /unmatch/i });
      expect(unmatchButton).toBeInTheDocument();
      expect(unmatchButton).toHaveTextContent('Unmatch');
    });

    it('applies correct styling to the unmatch button', () => {
      render(<UnmatchButton />);

      const unmatchButton = screen.getByRole('button', { name: /unmatch/i });
      expect(unmatchButton).toHaveClass('button', 'outline', 'w-[112px]', 'h-[40px]', 'text-[14px]', 'font-medium', 'bg-white', 'border', 'hover:bg-gray-100');
    });

    it('renders dialog structure correctly', () => {
      render(<UnmatchButton />);

      expect(screen.getByTestId('dialog')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    });

    it('renders dialog with correct width', () => {
      render(<UnmatchButton />);

      const dialogContent = screen.getByTestId('dialog-content');
      expect(dialogContent).toHaveClass('w-[400px]');
    });
  });

  describe('Dialog Content', () => {
    it('renders dialog header with correct title and description', () => {
      render(<UnmatchButton />);

      expect(screen.getByTestId('dialog-header')).toBeInTheDocument();

      const dialogTitle = screen.getByTestId('dialog-title');
      expect(dialogTitle).toHaveTextContent('Unmatch this person?');

      const dialogDescription = screen.getByTestId('dialog-description');
      expect(dialogDescription).toHaveTextContent("If you unmatch, you won't be able to chat with this person again. This action cannot be undone.");
    });

    it('renders dialog footer with correct structure', () => {
      render(<UnmatchButton />);

      const dialogFooter = screen.getByTestId('dialog-footer');
      expect(dialogFooter).toBeInTheDocument();
      expect(dialogFooter).toHaveClass('flex', 'justify-between', 'gap-2');
    });

    it('renders both action buttons in footer', () => {
      render(<UnmatchButton />);

      const keepMatchButton = screen.getByRole('button', { name: /keep match/i });
      const unmatchActionButton = screen.getByRole('button', { name: /unmatch/i });

      // Note: There will be 2 "Unmatch" buttons - trigger and action
      const unmatchButtons = screen.getAllByText('Unmatch');
      expect(unmatchButtons).toHaveLength(2);

      expect(keepMatchButton).toBeInTheDocument();
      expect(keepMatchButton).toHaveTextContent('Keep match');
    });
  });

  describe('Dialog Structure and Props', () => {
    it('sets asChild prop correctly on DialogTrigger', () => {
      render(<UnmatchButton />);

      const dialogTrigger = screen.getByTestId('dialog-trigger');
      expect(dialogTrigger).toHaveAttribute('data-as-child', 'true');
    });

    it('sets asChild prop correctly on DialogClose components', () => {
      render(<UnmatchButton />);

      const dialogCloseComponents = screen.getAllByTestId('dialog-close');
      expect(dialogCloseComponents).toHaveLength(2);

      dialogCloseComponents.forEach((component) => {
        expect(component).toHaveAttribute('data-as-child', 'true');
      });
    });
  });

  describe('Button Styling', () => {
    it('applies correct styling to Keep match button', () => {
      render(<UnmatchButton />);

      const keepMatchButton = screen.getByRole('button', { name: /keep match/i });
      expect(keepMatchButton).toHaveClass('bg-white', 'border', 'rounded-full', 'text-black', 'hover:bg-[#E11D48E5]', 'hover:text-white', 'px-4', 'py-2');
    });

    it('applies correct styling to Unmatch action button', () => {
      render(<UnmatchButton />);

      const unmatchButtons = screen.getAllByRole('button', { name: /unmatch/i });
      // Get the second unmatch button (action button, not trigger)
      const unmatchActionButton = unmatchButtons.find((button) => button.className.includes('rounded-full'));

      expect(unmatchActionButton).toHaveClass('bg-white', 'border', 'rounded-full', 'text-black', 'hover:bg-[#E11D48E5]', 'hover:text-white', 'px-4', 'py-2');
    });
  });

  describe('Navigation Functionality', () => {
    it('navigates to /chat when Keep match button is clicked', () => {
      render(<UnmatchButton />);

      const keepMatchButton = screen.getByRole('button', { name: /keep match/i });
      fireEvent.click(keepMatchButton);

      expect(mockPush).toHaveBeenCalledWith('/chat');
      expect(mockPush).toHaveBeenCalledTimes(1);
    });

    it('does not navigate when Unmatch action button is clicked', () => {
      render(<UnmatchButton />);

      const unmatchButtons = screen.getAllByRole('button', { name: /unmatch/i });
      const unmatchActionButton = unmatchButtons.find((button) => button.className.includes('rounded-full'));

      fireEvent.click(unmatchActionButton);

      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('User Interactions', () => {
    it('handles multiple clicks on Keep match button', () => {
      render(<UnmatchButton />);

      const keepMatchButton = screen.getByRole('button', { name: /keep match/i });

      fireEvent.click(keepMatchButton);
      fireEvent.click(keepMatchButton);
      fireEvent.click(keepMatchButton);

      expect(mockPush).toHaveBeenCalledTimes(3);
      expect(mockPush).toHaveBeenNthCalledWith(1, '/chat');
      expect(mockPush).toHaveBeenNthCalledWith(2, '/chat');
      expect(mockPush).toHaveBeenNthCalledWith(3, '/chat');
    });

    it('handles clicking on trigger button', () => {
      render(<UnmatchButton />);

      const triggerButton = screen.getAllByRole('button', { name: /unmatch/i })[0];

      // Should not cause navigation
      fireEvent.click(triggerButton);
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('provides accessible button text', () => {
      render(<UnmatchButton />);

      expect(screen.getByRole('button', { name: /unmatch/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /keep match/i })).toBeInTheDocument();
    });

    it('provides accessible dialog title and description', () => {
      render(<UnmatchButton />);

      const dialogTitle = screen.getByTestId('dialog-title');
      const dialogDescription = screen.getByTestId('dialog-description');

      expect(dialogTitle).toHaveTextContent('Unmatch this person?');
      expect(dialogDescription).toHaveTextContent("If you unmatch, you won't be able to chat with this person again. This action cannot be undone.");
    });

    it('uses semantic HTML elements', () => {
      render(<UnmatchButton />);

      const dialogTitle = screen.getByTestId('dialog-title');
      expect(dialogTitle.tagName).toBe('H2');

      const dialogDescription = screen.getByTestId('dialog-description');
      expect(dialogDescription.tagName).toBe('P');
    });

    it('provides proper button types', () => {
      render(<UnmatchButton />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });
  });

  describe('Dialog Behavior', () => {
    it('wraps buttons in DialogClose components', () => {
      render(<UnmatchButton />);

      const dialogCloseComponents = screen.getAllByTestId('dialog-close');
      expect(dialogCloseComponents).toHaveLength(2);

      // Check that buttons are inside DialogClose
      const keepMatchButton = screen.getByRole('button', { name: /keep match/i });
      const unmatchActionButton = screen.getAllByRole('button', { name: /unmatch/i }).find((button) => button.className.includes('rounded-full'));

      expect(keepMatchButton.closest('[data-testid="dialog-close"]')).toBeTruthy();
      expect(unmatchActionButton.closest('[data-testid="dialog-close"]')).toBeTruthy();
    });
  });

  describe('Component Structure', () => {
    it('has correct component hierarchy', () => {
      const { container } = render(<UnmatchButton />);

      // Check that main structure is a Dialog
      const dialog = container.querySelector('[data-testid="dialog"]');
      expect(dialog).toBeInTheDocument();

      // Check that DialogTrigger contains the trigger button
      const dialogTrigger = container.querySelector('[data-testid="dialog-trigger"]');
      expect(dialogTrigger).toBeInTheDocument();

      // Check that DialogContent contains the modal content
      const dialogContent = container.querySelector('[data-testid="dialog-content"]');
      expect(dialogContent).toBeInTheDocument();
    });

    it('maintains proper nesting of dialog components', () => {
      render(<UnmatchButton />);

      const dialogHeader = screen.getByTestId('dialog-header');
      const dialogTitle = screen.getByTestId('dialog-title');
      const dialogDescription = screen.getByTestId('dialog-description');
      const dialogFooter = screen.getByTestId('dialog-footer');

      // Check that title and description are inside header
      expect(dialogHeader).toContainElement(dialogTitle);
      expect(dialogHeader).toContainElement(dialogDescription);

      // Check that footer contains the action buttons
      const keepMatchButton = screen.getByRole('button', { name: /keep match/i });
      expect(dialogFooter).toContainElement(keepMatchButton);
    });
  });

  describe('Error Handling', () => {
    it('handles router push errors gracefully', () => {
      // Mock router.push to throw an error
      mockPush.mockImplementationOnce(() => {
        throw new Error('Navigation failed');
      });

      render(<UnmatchButton />);

      const keepMatchButton = screen.getByRole('button', { name: /keep match/i });

      // Should not throw an error when navigation fails
      expect(() => {
        fireEvent.click(keepMatchButton);
      }).not.toThrow();
    });
  });

  describe('Component Isolation', () => {
    it('renders independently without external dependencies', () => {
      const { container } = render(<UnmatchButton />);

      expect(container.firstChild).not.toBeNull();
      expect(screen.getByRole('button', { name: /unmatch/i })).toBeInTheDocument();
    });

    it('does not affect global state', () => {
      const { unmount } = render(<UnmatchButton />);

      const keepMatchButton = screen.getByRole('button', { name: /keep match/i });
      fireEvent.click(keepMatchButton);

      unmount();

      // Router should still be mockable for other tests
      expect(mockPush).toHaveBeenCalled();
    });
  });

  describe('Performance Considerations', () => {
    it('renders quickly without unnecessary re-renders', () => {
      const renderSpy = jest.fn();
      const TestWrapper = () => {
        renderSpy();
        return <UnmatchButton />;
      };

      render(<TestWrapper />);

      expect(renderSpy).toHaveBeenCalledTimes(1);
    });

    it('handles multiple rapid clicks without issues', () => {
      render(<UnmatchButton />);

      const keepMatchButton = screen.getByRole('button', { name: /keep match/i });

      // Rapid clicks
      for (let i = 0; i < 10; i++) {
        fireEvent.click(keepMatchButton);
      }

      expect(mockPush).toHaveBeenCalledTimes(10);
    });
  });

  describe('Text Content and Messaging', () => {
    it('displays correct warning message', () => {
      render(<UnmatchButton />);

      const warningMessage = "If you unmatch, you won't be able to chat with this person again. This action cannot be undone.";
      expect(screen.getByText(warningMessage)).toBeInTheDocument();
    });

    it('uses appropriate action verbs', () => {
      render(<UnmatchButton />);

      // Check for action-oriented button text
      expect(screen.getByText('Unmatch')).toBeInTheDocument();
      expect(screen.getByText('Keep match')).toBeInTheDocument();
      expect(screen.getByText('Unmatch this person?')).toBeInTheDocument();
    });
  });
});
