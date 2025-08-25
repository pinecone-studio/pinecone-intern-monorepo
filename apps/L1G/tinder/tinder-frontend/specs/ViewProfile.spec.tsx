import ViewProfile from '@/components/ViewProfile';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, ...props }) => <img src={src} alt={alt} width={width} height={height} className={className} {...props} />,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, className, ...props }) => (
    <button onClick={onClick} className={className} data-variant={variant} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }) => <div>{children}</div>,
  DialogContent: ({ children, className }) => <div className={className}>{children}</div>,
  DialogTrigger: ({ children }) => <div>{children}</div>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }) => <img src={src} alt={alt} width={width} height={height} className={className} data-testid="mocked-next-image" />,
}));

jest.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left">←</div>,
  ChevronRight: () => <div data-testid="chevron-right">→</div>,
}));

describe('ViewProfile Component', () => {
  const mockUserSingleAvatar = {
    id: 1,
    name: 'John Doe',
    age: 25,
    job: 'Software Engineer',
    avatar: ['/avatar1.jpg'],
  };

  const mockUserMultipleAvatars = {
    id: 2,
    name: 'Jane Smith',
    age: 30,
    job: 'Designer',
    avatar: ['/avatar1.jpg', '/avatar2.jpg', '/avatar3.jpg'],
  };

  const mockUserEmptyAvatar = {
    id: 3,
    name: 'Empty User',
    age: 28,
    job: 'Manager',
    avatar: [],
  };

  describe('Rendering', () => {
    it('renders view profile button when user has avatars', () => {
      render(<ViewProfile user={mockUserSingleAvatar} />);

      const viewProfileButton = screen.getByRole('button', { name: /view profile/i });
      expect(viewProfileButton).toBeInTheDocument();
      expect(viewProfileButton).toHaveClass('w-[112px]', 'h-[40px]');
    });

    it('renders nothing when user has no avatars', () => {
      const { container } = render(<ViewProfile user={mockUserEmptyAvatar} />);
      expect(container.firstChild).toBeNull();
    });

    it('renders nothing when user is null/undefined', () => {
      const { container } = render(<ViewProfile user={null} />);
      expect(container.firstChild).toBeNull();
    });

    it('renders dialog structure correctly', () => {
      render(<ViewProfile user={mockUserSingleAvatar} />);

      expect(screen.getByTestId('dialog')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-overlay')).toBeInTheDocument();
    });
  });

  describe('Profile Image Display', () => {
    it('displays first avatar by default', () => {
      render(<ViewProfile user={mockUserMultipleAvatars} />);

      const profileImage = screen.getByRole('img');
      expect(profileImage).toHaveAttribute('src', '/avatar1.jpg');
      expect(profileImage).toHaveAttribute('alt', 'Jane Smith profile 1');
    });

    it('applies correct image dimensions and classes', () => {
      render(<ViewProfile user={mockUserSingleAvatar} />);

      const profileImage = screen.getByRole('img');
      expect(profileImage).toHaveAttribute('width', '344');
      expect(profileImage).toHaveAttribute('height', '100');
      expect(profileImage).toHaveClass('rounded-lg', 'object-cover', 'w-[440px]', 'h-[660px]');
    });
  });

  describe('User Information Display', () => {
    it('displays user name and age', () => {
      render(<ViewProfile user={mockUserSingleAvatar} />);

      expect(screen.getByText('John Doe, 25')).toBeInTheDocument();
    });

    it('displays user job', () => {
      render(<ViewProfile user={mockUserSingleAvatar} />);

      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });

    it('applies correct styling to user info', () => {
      render(<ViewProfile user={mockUserSingleAvatar} />);

      const nameAge = screen.getByText('John Doe, 25');
      expect(nameAge).toHaveClass('text-[16px]', 'font-medium', 'text-black');

      const job = screen.getByText('Software Engineer');
      expect(job).toHaveClass('text-[14px]', 'text-gray-600');
    });
  });

  describe('Navigation Controls', () => {
    it('does not show navigation controls for single avatar', () => {
      render(<ViewProfile user={mockUserSingleAvatar} />);

      expect(screen.queryByTestId('chevron-left')).not.toBeInTheDocument();
      expect(screen.queryByTestId('chevron-right')).not.toBeInTheDocument();
    });

  it('navigates between images', () => {
    render(<ViewProfile user={mockUser} />);
    const img = screen.getByRole('img');
    const nextBtn = screen.getByTestId('next');

    fireEvent.click(nextBtn);
    expect(img).toHaveAttribute('src', '/img2.jpg');

    const prevBtn = screen.getByTestId('prev');
    fireEvent.click(prevBtn);
    expect(img).toHaveAttribute('src', '/img1.jpg');
  });

  it('cycles through images', () => {
    render(<ViewProfile user={mockUser} />);
    const img = screen.getByRole('img');
    const nextBtn = screen.getByTestId('next');
    const prevBtn = screen.getByTestId('prev');

    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    expect(img).toHaveAttribute('src', '/img1.jpg');

    it('wraps to last image when navigating prev from first image', async () => {
      const user = userEvent.setup();
      render(<ViewProfile user={mockUserMultipleAvatars} />);

      const prevButton = screen.getByTestId('chevron-left').closest('button');
      const profileImage = screen.getByRole('img');

      await user.click(prevButton);
      expect(profileImage).toHaveAttribute('src', '/avatar3.jpg');
    });
  });

  describe('Dialog Styling', () => {
    it('applies correct classes to dialog content', () => {
      render(<ViewProfile user={mockUserSingleAvatar} />);

      const dialogContent = screen.getByTestId('dialog-content');
      expect(dialogContent).toHaveClass('p-0', 'bg-transparent', 'border-none', 'shadow-none', 'max-w-[440px]');
    });

    it('applies correct classes to dialog overlay', () => {
      render(<ViewProfile user={mockUserSingleAvatar} />);

      const dialogOverlay = screen.getByTestId('dialog-overlay');
      expect(dialogOverlay).toHaveClass('bg-black/50', 'fixed', 'inset-0');
    });

    it('applies correct styling to user info container', () => {
      render(<ViewProfile user={mockUserSingleAvatar} />);

      const userInfoContainer = screen.getByText('John Doe, 25').closest('div');
      expect(userInfoContainer).toHaveClass('absolute', 'bottom-4', 'left-1/3', '-translate-x-1/2', 'bg-white/80', 'rounded-lg', 'py-2', 'text-start', 'backdrop-blur-sm');
    });
  });

  describe('Edge Cases', () => {
    it('handles user with very long name and job title', () => {
      const longNameUser = {
        ...mockUserSingleAvatar,
        name: 'Very Long Name That Might Overflow',
        job: 'Senior Full Stack Software Engineer and Team Lead',
      };

      render(<ViewProfile user={longNameUser} />);

      expect(screen.getByText('Very Long Name That Might Overflow, 25')).toBeInTheDocument();
      expect(screen.getByText('Senior Full Stack Software Engineer and Team Lead')).toBeInTheDocument();
    });

    it('handles rapid navigation clicks', async () => {
      const user = userEvent.setup();
      render(<ViewProfile user={mockUserMultipleAvatars} />);

      const nextButton = screen.getByTestId('chevron-right').closest('button');
      const profileImage = screen.getByRole('img');

      await user.click(nextButton);
      await user.click(nextButton);
      await user.click(nextButton);
      await user.click(nextButton);

      expect(profileImage).toHaveAttribute('src', '/avatar2.jpg');
    });
  });

  describe('Accessibility', () => {
    it('has accessible button text', () => {
      render(<ViewProfile user={mockUserSingleAvatar} />);

      expect(screen.getByRole('button', { name: /view profile/i })).toBeInTheDocument();
    });

    it('has descriptive alt text for profile images', () => {
      render(<ViewProfile user={mockUserMultipleAvatars} />);

      const profileImage = screen.getByRole('img');
      expect(profileImage).toHaveAccessibleName('Jane Smith profile 1');
    });

    it('navigation buttons are accessible', () => {
      render(<ViewProfile user={mockUserMultipleAvatars} />);

      const leftButton = screen.getByTestId('chevron-left').closest('button');
      const rightButton = screen.getByTestId('chevron-right').closest('button');

      expect(leftButton).toBeInTheDocument();
      expect(rightButton).toBeInTheDocument();
    });
  });
});
