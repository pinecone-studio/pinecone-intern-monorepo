import Avatar from '@/components/Avatar';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, ...props }) => <img src={src} alt={alt} width={width} height={height} className={className} {...props} />,
}));

describe('Avatar Component', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    age: 25,
    job: 'Software Engineer',
    avatar: ['/user-avatar.jpg', '/user-avatar2.jpg'],
  };
  const mockUserEmpty = { id: 2, name: 'Jane Smith', age: 30, job: 'Designer', avatar: [] };
  const mockUserNoName = { id: 3, name: '', age: 28, job: 'Manager', avatar: ['/manager.jpg'] };

  describe('Basic Rendering', () => {
    it('renders with user avatar from array', () => {
      render(<Avatar user={mockUser} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/user-avatar.jpg');
      expect(img).toHaveAttribute('alt', 'John Doe');
    });

    it('uses default avatar when array empty', () => {
      render(<Avatar user={mockUserEmpty} />);
      expect(screen.getByRole('img')).toHaveAttribute('src', '/profile.jpg');
    });

    it('uses fallback alt when name empty', () => {
      render(<Avatar user={mockUserNoName} />);
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'Avatar');
    });
  });

  describe('Size Handling', () => {
    it('applies default size 48px', () => {
      render(<Avatar user={mockUser} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('width', '48');
      expect(img).toHaveAttribute('height', '48');
    });

    it('applies custom size', () => {
      render(<Avatar user={mockUser} size={64} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('width', '64');
      expect(img).toHaveAttribute('height', '64');
    });
  });

  describe('CSS & Structure', () => {
    it('applies correct classes and structure', () => {
      const { container } = render(<Avatar user={mockUser} />);
      expect(container.firstChild).toHaveClass('relative');
      expect(screen.getByRole('img')).toHaveClass('rounded-full', 'object-cover');
    });
  });

  describe('Edge Cases', () => {
    it('handles null/undefined names', () => {
      render(<Avatar user={{ ...mockUser, name: null }} />);
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'Avatar');
    });

    it('uses first avatar from multiple images', () => {
      const user = { ...mockUser, avatar: ['/first.jpg', '/second.jpg'] };
      render(<Avatar user={user} />);
      expect(screen.getByRole('img')).toHaveAttribute('src', '/first.jpg');
    });

    it('handles zero and negative sizes', () => {
      render(<Avatar user={mockUser} size={0} />);
      expect(screen.getByRole('img')).toHaveAttribute('width', '0');
    });
  });

  describe('Re-rendering', () => {
    it('updates when props change', () => {
      const { rerender } = render(<Avatar user={mockUser} size={32} />);
      expect(screen.getByRole('img')).toHaveAttribute('width', '32');

      rerender(<Avatar user={mockUser} size={64} />);
      expect(screen.getByRole('img')).toHaveAttribute('width', '64');
    });
  });
});
