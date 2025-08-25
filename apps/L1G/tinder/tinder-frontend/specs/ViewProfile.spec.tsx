import ViewProfile from '@/components/ViewProfile';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, ...props }) => (
    <button onClick={onClick} className={className} {...props}>
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
  ChevronLeft: () => <span data-testid="prev">←</span>,
  ChevronRight: () => <span data-testid="next">→</span>,
}));

describe('ViewProfile', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    age: 25,
    job: 'Engineer',
    avatar: ['/img1.jpg', '/img2.jpg', '/img3.jpg'],
  };
  const singleUser = { ...mockUser, avatar: ['/single.jpg'] };
  const emptyUser = { ...mockUser, avatar: [] };

  it('renders button and user info', () => {
    render(<ViewProfile user={mockUser} />);
    expect(screen.getByText('View Profile')).toBeInTheDocument();
    expect(screen.getByText('John Doe, 25')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('displays first image by default', () => {
    render(<ViewProfile user={mockUser} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/img1.jpg');
    expect(img).toHaveAttribute('alt', 'John Doe - profile image 1');
  });

  it('shows navigation for multiple images', () => {
    render(<ViewProfile user={mockUser} />);
    expect(screen.getByTestId('prev')).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();
  });

  it('hides navigation for single image', () => {
    render(<ViewProfile user={singleUser} />);
    expect(screen.queryByTestId('prev')).not.toBeInTheDocument();
    expect(screen.queryByTestId('next')).not.toBeInTheDocument();
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

    fireEvent.click(prevBtn);
    expect(img).toHaveAttribute('src', '/img3.jpg');
  });

  it('returns null for empty avatar', () => {
    const { container } = render(<ViewProfile user={emptyUser} />);
    expect(container.firstChild).toBeNull();
  });

  it('handles missing user name', () => {
    render(<ViewProfile user={{ ...mockUser, name: '' }} />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'User - profile image 1');
  });
});
