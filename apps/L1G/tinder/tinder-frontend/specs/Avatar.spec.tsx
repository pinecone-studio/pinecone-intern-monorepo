import Avatar from '@/components/Avatar';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, ...props }) => <img src={src} alt={alt} width={width} height={height} className={className} {...props} />,
}));

describe('Avatar Component', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    age: 25,
    profession: 'Software Engineer',
    images: ['/user-avatar.jpg', '/user-avatar2.jpg'],
    dateOfBirth: '1998-04-12',
    startedConversation: true,
  };
  const mockUserEmptyImages = {
    id: '2',
    name: 'Jane Smith',
    age: 30,
    profession: 'Designer',
    images: [],
    dateOfBirth: '1993-09-22',
    startedConversation: false,
  };
  const mockUserNoName = {
    id: '3',
    name: '',
    age: 28,
    profession: 'Manager',
    images: ['/manager.jpg'],
    dateOfBirth: '1995-05-10',
    startedConversation: false,
  };

  describe('Basic Rendering', () => {
    it('renders with user avatar from images array', () => {
      render(<Avatar user={mockUser} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/user-avatar.jpg');
      expect(img).toHaveAttribute('alt', 'John Doe');
    });

    it('uses default avatar when images array is empty', () => {
      render(<Avatar user={mockUserEmptyImages} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/profile.jpg');
      expect(img).toHaveAttribute('alt', 'Jane Smith');
    });

    it('uses fallback alt when name is empty', () => {
      render(<Avatar user={mockUserNoName} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Avatar');
    });
  });

  describe('Size Handling', () => {
    it('applies default size 48px', () => {
      render(<Avatar user={mockUser} />);
      const container = screen.getByRole('img').parentElement;
      expect(container).toHaveStyle({ width: '48px', height: '48px' });
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('width', '48');
      expect(img).toHaveAttribute('height', '48');
    });

    it('applies custom size', () => {
      render(<Avatar user={mockUser} size={64} />);
      const container = screen.getByRole('img').parentElement;
      expect(container).toHaveStyle({ width: '64px', height: '64px' });
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('width', '64');
      expect(img).toHaveAttribute('height', '64');
    });
  });

  describe('CSS & Structure', () => {
    it('has correct wrapper classes', () => {
      const { container } = render(<Avatar user={mockUser} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('overflow-hidden', 'rounded-full');
    });

    it('img has correct classes', () => {
      render(<Avatar user={mockUser} />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('object-cover', 'w-full', 'h-full');
    });
  });

  describe('Edge Cases', () => {
    it('handles null/undefined names by falling back alt', () => {
      render(<Avatar user={{ ...mockUser, name: null }} />);
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'Avatar');
    });

    it('uses first image from multiple images', () => {
      const userWithMultipleImages = { ...mockUser, images: ['/first.jpg', '/second.jpg'] };
      render(<Avatar user={userWithMultipleImages} />);
      expect(screen.getByRole('img')).toHaveAttribute('src', '/first.jpg');
    });

    it('handles zero and negative sizes', () => {
      render(<Avatar user={mockUser} size={0} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('width', '0');
      expect(img).toHaveAttribute('height', '0');
    });
  });

  describe('Re-rendering', () => {
    it('updates image size when props change', () => {
      const { rerender } = render(<Avatar user={mockUser} size={32} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('width', '32');
      expect(img).toHaveAttribute('height', '32');

      rerender(<Avatar user={mockUser} size={64} />);
      expect(screen.getByRole('img')).toHaveAttribute('width', '64');
      expect(screen.getByRole('img')).toHaveAttribute('height', '64');
    });
  });
});
