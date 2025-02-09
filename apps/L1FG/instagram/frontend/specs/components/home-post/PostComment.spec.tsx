import '@testing-library/jest-dom';
import { PostComment } from '@/components/home-post/PostComment';
import { render, screen } from '@testing-library/react';
import { mockPost } from './mock';
describe('Post comment', () => {
  const mockComments = [-3, 0, 34];
  const mockPosts = mockComments.map((comment) => {
    const newPost = {
      ...mockPost,
      node: { ...mockPost.node, commentCount: comment },
    };
    return newPost;
  });
  it('Should render empty comment', () => {
    const { getByTestId } = render(<PostComment post={mockPosts[0]} />);
    const commentElement = screen.getByTestId('comment');
    expect(commentElement).toBeDefined();
    expect(commentElement).toHaveTextContent('');
    expect(getByTestId('add-comment')).toBeDefined();
  });
  it('Should render empty comment', () => {
    const { getByTestId } = render(<PostComment post={mockPosts[1]} />);
    const commentElement = screen.getByTestId('comment');
    expect(commentElement).toBeDefined();
    expect(commentElement).toHaveTextContent('');
    expect(getByTestId('add-comment')).toBeDefined();
  });
  it('Should render view comments', () => {
    const { getByTestId } = render(<PostComment post={mockPosts[2]} />);
    const commentElement = screen.getByTestId('comment');
    expect(commentElement).toBeDefined();
    expect(commentElement).toHaveTextContent('34 comments');
    expect(getByTestId('add-comment')).toBeDefined();
  });
});
