<<<<<<< HEAD
/*eslint-disable max-lines */
=======
>>>>>>> adc4e6da7 (chat garh heseg)
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

  const mockUserWithEmptyAvatar = {
    id: 2,
    name: 'Jane Smith',
    age: 30,
    job: 'Designer',
    avatar: [],
  };

  const mockUserWithoutName = {
    id: 3,
    name: '',
    age: 28,
    job: 'Manager',
    avatar: ['/manager-avatar.jpg'],
  };

  describe('Rendering', () => {
    it('renders with user avatar when avatar array has images', () => {
      render(<Avatar user={mockUser} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute('src', '/user-avatar.jpg');
      expect(avatarImage).toHaveAttribute('alt', 'John Doe');
    });

    it('renders with default avatar when avatar array is empty', () => {
      render(<Avatar user={mockUserWithEmptyAvatar} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute('src', '/profile.jpg');
      expect(avatarImage).toHaveAttribute('alt', 'Jane Smith');
    });

    it('renders with fallback alt text when user name is empty', () => {
      render(<Avatar user={mockUserWithoutName} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute('alt', 'Avatar');
    });
  });

  describe('Size Props', () => {
    it('renders with default size when size prop is not provided', () => {
      render(<Avatar user={mockUser} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAttribute('width', '48');
      expect(avatarImage).toHaveAttribute('height', '48');
    });

    it('renders with custom size when size prop is provided', () => {
      render(<Avatar user={mockUser} size={64} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAttribute('width', '64');
      expect(avatarImage).toHaveAttribute('height', '64');
    });

    it('renders with different custom sizes', () => {
      const { rerender } = render(<Avatar user={mockUser} size={32} />);

      let avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAttribute('width', '32');
      expect(avatarImage).toHaveAttribute('height', '32');

      rerender(<Avatar user={mockUser} size={100} />);

      avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAttribute('width', '100');
      expect(avatarImage).toHaveAttribute('height', '100');
    });
  });

  describe('CSS Classes', () => {
    it('applies correct CSS classes', () => {
      render(<Avatar user={mockUser} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveClass('rounded-full', 'object-cover');
    });

    it('has relative positioned container', () => {
      const { container } = render(<Avatar user={mockUser} />);

      const avatarContainer = container.firstChild;
      expect(avatarContainer).toHaveClass('relative');
    });
  });

  describe('Avatar Array Logic', () => {
    it('uses first image from avatar array when multiple images exist', () => {
      const userWithMultipleAvatars = {
        ...mockUser,
        avatar: ['/first-image.jpg', '/second-image.jpg', '/third-image.jpg'],
      };

      render(<Avatar user={userWithMultipleAvatars} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAttribute('src', '/first-image.jpg');
    });

    it('handles single image in avatar array', () => {
      const userWithSingleAvatar = {
        ...mockUser,
        avatar: ['/single-image.jpg'],
      };

      render(<Avatar user={userWithSingleAvatar} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAttribute('src', '/single-image.jpg');
    });
  });

  describe('Edge Cases', () => {
    it('handles user with null/undefined name gracefully', () => {
      const userWithNullName = {
        ...mockUser,
        name: null,
      };

      render(<Avatar user={userWithNullName} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAttribute('alt', 'Avatar');
    });

    it('handles undefined name gracefully', () => {
      const userWithUndefinedName = {
        ...mockUser,
        name: undefined,
      };

      render(<Avatar user={userWithUndefinedName} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAttribute('alt', 'Avatar');
    });

    it('handles zero size prop', () => {
      render(<Avatar user={mockUser} size={0} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAttribute('width', '0');
      expect(avatarImage).toHaveAttribute('height', '0');
    });

    it('renders correctly when avatar array exists but is empty', () => {
      const userWithEmptyArray = {
        ...mockUser,
        avatar: [],
      };

      render(<Avatar user={userWithEmptyArray} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAttribute('src', '/profile.jpg');
    });
  });

  describe('Accessibility', () => {
    it('has proper alt text for screen readers', () => {
      render(<Avatar user={mockUser} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAccessibleName('John Doe');
    });

    it('provides fallback alt text when name is missing', () => {
      render(<Avatar user={mockUserWithoutName} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAccessibleName('Avatar');
    });

    it('provides fallback alt text when name is null', () => {
      const userWithNullName = {
        ...mockUser,
        name: null,
      };

      render(<Avatar user={userWithNullName} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAccessibleName('Avatar');
    });
  });

  describe('Component Structure', () => {
    it('wraps image in a relative positioned div', () => {
      const { container } = render(<Avatar user={mockUser} />);

      const wrapper = container.firstChild;
      expect(wrapper.tagName).toBe('DIV');
      expect(wrapper).toHaveClass('relative');

      const image = wrapper.firstChild;
      expect(image.tagName).toBe('IMG');
    });

    it('maintains proper DOM structure with custom size', () => {
      const { container } = render(<Avatar user={mockUser} size={64} />);

      const wrapper = container.firstChild;
      expect(wrapper.tagName).toBe('DIV');
      expect(wrapper).toHaveClass('relative');

      const image = wrapper.firstChild;
      expect(image.tagName).toBe('IMG');
      expect(image).toHaveAttribute('width', '64');
      expect(image).toHaveAttribute('height', '64');
    });
  });

  describe('Type Safety', () => {
    it('handles numeric values properly', () => {
      render(<Avatar user={mockUser} size={48} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAttribute('width', '48');
      expect(avatarImage).toHaveAttribute('height', '48');
    });

    it('handles large size values', () => {
      render(<Avatar user={mockUser} size={200} />);

      const avatarImage = screen.getByRole('img');
      expect(avatarImage).toHaveAttribute('width', '200');
      expect(avatarImage).toHaveAttribute('height', '200');
    });
  });
});
