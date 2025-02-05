import { Gender } from '@/generated';

export const mockPost = {
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
