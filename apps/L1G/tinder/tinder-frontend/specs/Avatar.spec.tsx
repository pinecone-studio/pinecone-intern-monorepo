/* eslint-disable max-lines */

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
      render(<Avatar user={mockUser} width={48} height={48} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/user-avatar.jpg');
      expect(img).toHaveAttribute('alt', 'John Doe');
    });

    it('uses default avatar when images array is empty', () => {
      render(<Avatar user={mockUserEmptyImages} width={48} height={48} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/profile.jpg');
      expect(img).toHaveAttribute('alt', 'Jane Smith');
    });

    it('uses fallback alt when name is empty', () => {
      render(<Avatar user={mockUserNoName} width={48} height={48} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Avatar');
    });
  });

  describe('Size Handling', () => {
    it('applies custom width and height', () => {
      render(<Avatar user={mockUser} width={64} height={64} />);
      const container = screen.getByRole('img').parentElement;
      expect(container).toHaveStyle({ width: '64px', height: '64px' });
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('width', '64');
      expect(img).toHaveAttribute('height', '64');
    });

    it('handles different width and height values', () => {
      render(<Avatar user={mockUser} width={50} height={70} />);
      const container = screen.getByRole('img').parentElement;
      expect(container).toHaveStyle({ width: '50px', height: '70px' });
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('width', '50');
      expect(img).toHaveAttribute('height', '70');
    });
  });

  describe('CSS & Structure', () => {
    it('has correct wrapper classes', () => {
      const { container } = render(<Avatar user={mockUser} width={48} height={48} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('overflow-hidden');
    });

    it('img has correct classes', () => {
      render(<Avatar user={mockUser} width={48} height={48} />);
      const img = screen.getByRole('img');
      expect(img).toHaveClass('object-cover', 'w-full', 'h-full');
    });

    it('applies custom className to wrapper', () => {
      const { container } = render(<Avatar user={mockUser} width={48} height={48} className="custom-class" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Edge Cases', () => {
    it('handles null/undefined names by falling back alt', () => {
      render(<Avatar user={{ ...mockUser, name: null }} width={48} height={48} />);
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'Avatar');
    });

    it('uses first image from multiple images', () => {
      const userWithMultipleImages = { ...mockUser, images: ['/first.jpg', '/second.jpg'] };
      render(<Avatar user={userWithMultipleImages} width={48} height={48} />);
      expect(screen.getByRole('img')).toHaveAttribute('src', '/first.jpg');
    });

    it('handles zero sizes', () => {
      render(<Avatar user={mockUser} width={0} height={0} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('width', '0');
      expect(img).toHaveAttribute('height', '0');
    });

    it('handles negative sizes', () => {
      render(<Avatar user={mockUser} width={-10} height={-10} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('width', '-10');
      expect(img).toHaveAttribute('height', '-10');
    });

    it('handles undefined width and height', () => {
      render(<Avatar user={mockUser} />);
      const container = screen.getByRole('img').parentElement;

      // Check that the container doesn't have explicit width and height styles
      expect(container.style.width).toBe('');
      expect(container.style.height).toBe('');

      const img = screen.getByRole('img');
      expect(img).not.toHaveAttribute('width');
      expect(img).not.toHaveAttribute('height');
    });
  });

  describe('Re-rendering', () => {
    it('updates image size when props change', () => {
      const { rerender } = render(<Avatar user={mockUser} width={32} height={32} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('width', '32');
      expect(img).toHaveAttribute('height', '32');

      rerender(<Avatar user={mockUser} width={64} height={64} />);
      expect(screen.getByRole('img')).toHaveAttribute('width', '64');
      expect(screen.getByRole('img')).toHaveAttribute('height', '64');
    });

    it('updates image when user changes', () => {
      const { rerender } = render(<Avatar user={mockUser} width={48} height={48} />);
      expect(screen.getByRole('img')).toHaveAttribute('src', '/user-avatar.jpg');

      rerender(<Avatar user={mockUserEmptyImages} width={48} height={48} />);
      expect(screen.getByRole('img')).toHaveAttribute('src', '/profile.jpg');
    });
  });
});
 