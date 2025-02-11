import { PostsLoading } from '@/components/home-post/PostsLoading';
import { render, screen } from '@testing-library/react';

describe('Posts loading', () => {
  it('It shoudl return null', () => {
    render(<PostsLoading hasNextPage={false} />);
    expect(screen.queryByTestId('posts-loading')).toBeNull();
  });
  it('It shoud return loading', () => {
    render(<PostsLoading hasNextPage={true} />);
    expect(screen.queryByTestId('posts-loading')).toBeDefined();
  });
});
