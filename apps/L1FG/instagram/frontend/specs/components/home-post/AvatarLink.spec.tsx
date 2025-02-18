import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockPost } from './mock';
import { AvatarLink } from '@/components/home-post';

const mockPostsLatestStoryTime = [0, 1234].map((latest) => {
  const newPost = {
    ...mockPost,
    node: {
      ...mockPost.node,
      user: {
        ...mockPost.node.user,
        latestStoryTimestamp: latest,
      },
    },
  };
  return newPost;
});
describe('Avatar link', () => {
  it('Should render when hasStoryToSee is false', () => {
    render(<AvatarLink post={mockPostsLatestStoryTime[0]} />);
    const avatarContainer = screen.getByTestId('avatar-inside-avatar-link');
    expect(avatarContainer).not.toHaveClass('bg-[linear-gradient(to_top_right,#f9ce34_10%,#ee2a7b_60%)]');
  });
  it('SHould render hasStoryToSee is true', () => {
    render(<AvatarLink post={mockPostsLatestStoryTime[1]} />);
    const avatarContainer = screen.getByTestId('avatar-inside-avatar-link');
    expect(avatarContainer).toHaveClass('bg-[linear-gradient(to_top_right,#f9ce34_10%,#ee2a7b_60%)]');
  });
});
