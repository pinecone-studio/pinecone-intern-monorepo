import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProfilePagePostsAndSaved from '@/components/ProfilePagePostsAndSaved';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));
jest.mock('@/components/ProfilePagePosts', () => ({
  styles: {
    selected: 'mock-selected-class',
    notSelected: 'mock-not-selected-class',
  },
}));
describe('ProfilePagePostsAndSaved', () => {
  let mockPush: jest.Mock;
  let mockSearchParams: { get: jest.Mock };

  beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    mockSearchParams = {
      get: jest.fn(),
    };
    useSearchParams.mockReturnValue(mockSearchParams);
  });

  test('renders "posts" and "saved" buttons correctly', () => {
    mockSearchParams.get.mockImplementation((key) => {
      if (key === 'type') return 'posts';
      if (key === 'username') return 'john_doe';
      return null;
    });

    const user = { username: 'john_doe' };

    render(<ProfilePagePostsAndSaved user={user} />);

    const postsButton = screen.getByText('posts');
    expect(postsButton.classList.contains('mock-selected-class'));
    const savedButton = screen.getByText('saved');
    expect(savedButton.classList.contains('mock-selected-class'));
  });

  test('does not render "saved" button if user is not the profile owner', () => {
    mockSearchParams.get.mockImplementation((key) => {
      if (key === 'type') return 'posts';
      if (key === 'username') return 'john_doe';
      return null;
    });

    const user = { username: 'other_user' };

    render(<ProfilePagePostsAndSaved user={user} />);

    expect(screen.queryByText('saved')).toBe(null);
  });

  test('applies correct class when "posts" button is selected', () => {
    mockSearchParams.get.mockImplementation((key) => {
      if (key === 'type') return 'posts';
      if (key === 'username') return 'john_doe';
      return null;
    });

    const user = { username: 'john_doe' };

    render(<ProfilePagePostsAndSaved user={user} />);

    const postsButton = screen.getByText('posts');
    expect(postsButton.classList.contains('mock-selected-class'));
    expect(postsButton.classList.contains('mock-not-selected-class'));
  });

  test('applies correct class when "saved" button is selected', () => {
    mockSearchParams.get.mockImplementation((key) => {
      if (key === 'type') return 'saved';
      if (key === 'username') return 'john_doe';
      return null;
    });

    const user = { username: 'john_doe' };

    render(<ProfilePagePostsAndSaved user={user} />);

    const savedButton = screen.getByText('saved');
    expect(savedButton.classList.contains('mock-selected-class'));
    expect(savedButton.classList.contains('mock-not-selected-class'));
  });

  test('navigates to correct URL when "posts" button is clicked', () => {
    mockSearchParams.get.mockImplementation((key) => {
      if (key === 'type') return 'posts';
      if (key === 'username') return 'john_doe';
      return null;
    });

    const user = { username: 'john_doe' };

    render(<ProfilePagePostsAndSaved user={user} />);

    const postsButton = screen.getByTestId('posts-button');
    fireEvent.click(postsButton);

    expect(mockPush).toHaveBeenCalledWith('/profile?username=john_doe&type=posts');
  });

  test('navigates to correct URL when "saved" button is clicked', () => {
    mockSearchParams.get.mockImplementation((key) => {
      if (key === 'type') return 'posts';
      if (key === 'username') return 'john_doe';
      return null;
    });

    const user = { username: 'john_doe' };

    render(<ProfilePagePostsAndSaved user={user} />);

    const savedButton = screen.getByTestId('saved-button');
    fireEvent.click(savedButton);
  });
});
