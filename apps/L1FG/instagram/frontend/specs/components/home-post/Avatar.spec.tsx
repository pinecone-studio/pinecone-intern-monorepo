import { Avatar } from '@/components/home-post/Avatar';
import { render, screen } from '@testing-library/react';
import { mockPost } from './mock';
type ImageProps = {
  src: string;
  alt: string;
  fill: boolean;
  className: string;
};
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, className, ...props }: ImageProps) => {
    const fillClasses = fill ? 'absolute inset-0 h-full w-full object-cover' : '';
    const combinedClasses = `${fillClasses} ${className || ''}`;
    return <img src={src} data-testid="next-image" className={combinedClasses} {...props} />;
  },
}));
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
describe('Avatar', () => {
  it('Should render avatar that has no story', () => {
    render(<Avatar post={mockPostsLatestStoryTime[0]} />);
    expect(screen.getByTestId('next-image')).toBeDefined();
  });
  it('SHould render avatar that has story', () => {
    render(<Avatar post={mockPostsLatestStoryTime[1]} />);
    expect(screen.getByTestId('next-image')).toBeDefined();
  });
});
