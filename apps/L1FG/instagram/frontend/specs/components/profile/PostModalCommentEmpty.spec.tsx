import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserPostType } from '@/generated';
import PostModalCommentEmpty from '@/components/profile/PostModalCommentEmpty';

const mockPost: UserPostType = {
  postImage: ['/images/test-image.jpg'],
  user: { fullName: 'John Doe' },
  commentCount: 5,
};

describe('PostModalCommentEmpty Component', () => {
  it('renders the component correctly', () => {
    render(
      <PostModalCommentEmpty post={mockPost}>
        <button>Open Modal</button>
      </PostModalCommentEmpty>
    );

    expect(screen.getByText('Open Modal')).toBeInTheDocument();
  });

  it('opens the modal when clicked', () => {
    render(
      <PostModalCommentEmpty post={mockPost}>
        <button>Open Modal</button>
      </PostModalCommentEmpty>
    );

    fireEvent.click(screen.getByText('Open Modal'));

    expect(screen.getByTestId('Post-Modal')).toBeInTheDocument();
  });

  it('displays post image and user details', () => {
    render(
      <PostModalCommentEmpty post={mockPost}>
        <button>Open Modal</button>
      </PostModalCommentEmpty>
    );

    fireEvent.click(screen.getByText('Open Modal'));

    expect(screen.getByAltText('Post')).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders interaction buttons correctly', () => {
    render(
      <PostModalCommentEmpty post={mockPost}>
        <button>Open Modal</button>
      </PostModalCommentEmpty>
    );

    fireEvent.click(screen.getByText('Open Modal'));
  });
});
