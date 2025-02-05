import { Avatar } from '@/components/home-post/Avatar';
import { Gender } from '@/generated';
import { render, screen } from '@testing-library/react';
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
const mockPost = {
  cursor: '123',
  node: {
    _id: '13',
    caption: 'hi',
    carouselMediaCount: 1,
    commentCount: 1,
    createdAt: 1738686873069,
    hasLiked: false,
    likeCount: 2,
    postImage: ['image.jpg'],
    user: {
      _id: '12',
      bio: 'nurser',
      email: 'john@gmail.com',
      followerCount: 3,
      followingCount: 3,
      friendshipStatus: {
        followedBy: false,
        following: false,
        incomingRequest: false,
        outgoingRequest: false,
      },
      fullName: 'john mackvey',
      gender: Gender.Male,
      hasStory: false,
      isPrivate: false,
      latestStoryTimestamp: 0,
      postCount: 8,
      profileImage: 'image.jpg',
      savedUsers: ['31'],
      seenStoryTime: 0,
      userName: 'lala',
    },
    userId: '12',
  },
};
describe('Avatar', () => {
  it('Should render', () => {
    render(<Avatar post={mockPost} />);
    expect(screen.getByTestId('next-image')).toBeDefined();
  });
});
