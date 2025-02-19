/* eslint-disable max-lines */
/* eslint-disable no-secrets/no-secrets */
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
export const previewProfileMockData = {
  data: {
    getProfilePreview: {
      searchingUserId: '678e1e9179fd42a3a41c8dfe',
      user: {
        userName: 'dev',
        fullName: 'devdev',
        bio: 'devedeededede',
        profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
        hasStory: false,
        gender: 'male',
        isPrivate: false,
        email: 'dev@gmail.com',
        followingCount: 1,
        followerCount: 0,
        postCount: 4,
        latestStoryTimestamp: 0,
        seenStoryTime: 0,
        savedUsers: ['6789fe2e6ac4e4a4329b877d'],
        friendshipStatus: {
          followedBy: false,
          following: false,
          incomingRequest: false,
          outgoingRequest: false,
        },
        _id: '678e1e9179fd42a3a41c8dfe',
      },
      viewer: {
        _id: '678e1e9179fd42a3a41c8dfe',
        profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
        isPrivate: false,
        email: 'dev@gmail.com',
      },
      firstThreePosts: [
        {
          node: {
            postImage: ['https://res.cloudinary.com/dqxstnqrf/image/upload/v1738728979/tmyculybciw6e6gqldox.png'],
            user: {
              latestStoryTimestamp: 0,
              seenStoryTime: 0,
              profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            },
          },
          cursor: 'NjdhMmU2MWYyOTQ0YzY0N2VhN2RmZDE3',
        },
        {
          node: {
            postImage: ['https://res.cloudinary.com/dqxstnqrf/image/upload/v1738727981/jvuucocnyamaeltti9dn.png'],
            user: {
              latestStoryTimestamp: 0,
              seenStoryTime: 0,
              profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            },
          },
          cursor: 'NjdhMmUyNDBiZTQ2ZjBlMGIwNzlkN2Nh',
        },
        {
          node: {
            postImage: ['https://res.cloudinary.com/dqxstnqrf/image/upload/v1738650491/i0do9gibkdi8gjajjqje.png'],
            user: {
              latestStoryTimestamp: 0,
              seenStoryTime: 0,
              profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            },
          },
          cursor: 'NjdhMWIzOGYzOWFiZjMxY2YwNmUzYzMw',
        },
      ],
    },
  },
};
export const previewProfileMockDataFollowingTrue = {
  data: {
    getProfilePreview: {
      searchingUserId: '678e1e9179fd42a3a41c8dfe',
      user: {
        userName: 'dev',
        fullName: 'devdev',
        bio: 'devedeededede',
        profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
        hasStory: false,
        gender: 'male',
        isPrivate: false,
        email: 'dev@gmail.com',
        followingCount: 1,
        followerCount: 0,
        postCount: 4,
        latestStoryTimestamp: 0,
        seenStoryTime: 0,
        savedUsers: ['6789fe2e6ac4e4a4329b877d'],
        friendshipStatus: {
          followedBy: false,
          following: true,
          incomingRequest: false,
          outgoingRequest: false,
        },
        _id: '678e1e9179fd42a3a41c8dfe',
      },
      viewer: {
        _id: '678e1e9179fd42a3a41c8dfe',
        profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
        isPrivate: false,
        email: 'dev@gmail.com',
      },
      firstThreePosts: [
        {
          node: {
            postImage: ['https://res.cloudinary.com/dqxstnqrf/image/upload/v1738728979/tmyculybciw6e6gqldox.png'],
            user: {
              latestStoryTimestamp: 0,
              seenStoryTime: 0,
              profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            },
          },
          cursor: 'NjdhMmU2MWYyOTQ0YzY0N2VhN2RmZDE3',
        },
        {
          node: {
            postImage: ['https://res.cloudinary.com/dqxstnqrf/image/upload/v1738727981/jvuucocnyamaeltti9dn.png'],
            user: {
              latestStoryTimestamp: 0,
              seenStoryTime: 0,
              profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            },
          },
          cursor: 'NjdhMmUyNDBiZTQ2ZjBlMGIwNzlkN2Nh',
        },
        {
          node: {
            postImage: ['https://res.cloudinary.com/dqxstnqrf/image/upload/v1738650491/i0do9gibkdi8gjajjqje.png'],
            user: {
              latestStoryTimestamp: 0,
              seenStoryTime: 0,
              profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            },
          },
          cursor: 'NjdhMWIzOGYzOWFiZjMxY2YwNmUzYzMw',
        },
      ],
    },
  },
};
export const previewProfileMockDataPostCountZero = {
  data: {
    getProfilePreview: {
      searchingUserId: '678e1e9179fd42a3a41c8dfe',
      user: {
        userName: 'dev',
        fullName: 'devdev',
        bio: 'devedeededede',
        profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
        hasStory: false,
        gender: 'male',
        isPrivate: false,
        email: 'dev@gmail.com',
        followingCount: 1,
        followerCount: 0,
        postCount: 0,
        latestStoryTimestamp: 0,
        seenStoryTime: 0,
        savedUsers: ['6789fe2e6ac4e4a4329b877d'],
        friendshipStatus: {
          followedBy: false,
          following: true,
          incomingRequest: false,
          outgoingRequest: false,
        },
        _id: '678e1e9179fd42a3a41c8dfe',
      },
      viewer: {
        _id: '678e1e9179fd42a3a41c8dfe',
        profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
        isPrivate: false,
        email: 'dev@gmail.com',
      },
      firstThreePosts: [
        {
          node: {
            postImage: ['https://res.cloudinary.com/dqxstnqrf/image/upload/v1738728979/tmyculybciw6e6gqldox.png'],
            user: {
              latestStoryTimestamp: 0,
              seenStoryTime: 0,
              profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            },
          },
          cursor: 'NjdhMmU2MWYyOTQ0YzY0N2VhN2RmZDE3',
        },
        {
          node: {
            postImage: ['https://res.cloudinary.com/dqxstnqrf/image/upload/v1738727981/jvuucocnyamaeltti9dn.png'],
            user: {
              latestStoryTimestamp: 0,
              seenStoryTime: 0,
              profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            },
          },
          cursor: 'NjdhMmUyNDBiZTQ2ZjBlMGIwNzlkN2Nh',
        },
        {
          node: {
            postImage: ['https://res.cloudinary.com/dqxstnqrf/image/upload/v1738650491/i0do9gibkdi8gjajjqje.png'],
            user: {
              latestStoryTimestamp: 0,
              seenStoryTime: 0,
              profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            },
          },
          cursor: 'NjdhMWIzOGYzOWFiZjMxY2YwNmUzYzMw',
        },
      ],
    },
  },
};
export const previewProfileMockDataPrivate = {
  data: {
    getProfilePreview: {
      searchingUserId: '678e1e9179fd42a3a41c8dfe',
      user: {
        userName: 'dev',
        fullName: 'devdev',
        bio: 'devedeededede',
        profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
        hasStory: false,
        gender: 'male',
        isPrivate: true,
        email: 'dev@gmail.com',
        followingCount: 1,
        followerCount: 0,
        postCount: 0,
        latestStoryTimestamp: 0,
        seenStoryTime: 0,
        savedUsers: ['6789fe2e6ac4e4a4329b877d'],
        friendshipStatus: {
          followedBy: false,
          following: true,
          incomingRequest: false,
          outgoingRequest: false,
        },
        _id: '678e1e9179fd42a3a41c8dfe',
      },
      viewer: {
        _id: '678e1e9179fd42a3a41c8dfe',
        profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
        isPrivate: false,
        email: 'dev@gmail.com',
      },
      firstThreePosts: [
        {
          node: {
            postImage: ['https://res.cloudinary.com/dqxstnqrf/image/upload/v1738728979/tmyculybciw6e6gqldox.png'],
            user: {
              latestStoryTimestamp: 0,
              seenStoryTime: 0,
              profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            },
          },
          cursor: 'NjdhMmU2MWYyOTQ0YzY0N2VhN2RmZDE3',
        },
        {
          node: {
            postImage: ['https://res.cloudinary.com/dqxstnqrf/image/upload/v1738727981/jvuucocnyamaeltti9dn.png'],
            user: {
              latestStoryTimestamp: 0,
              seenStoryTime: 0,
              profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            },
          },
          cursor: 'NjdhMmUyNDBiZTQ2ZjBlMGIwNzlkN2Nh',
        },
        {
          node: {
            postImage: ['https://res.cloudinary.com/dqxstnqrf/image/upload/v1738650491/i0do9gibkdi8gjajjqje.png'],
            user: {
              latestStoryTimestamp: 0,
              seenStoryTime: 0,
              profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            },
          },
          cursor: 'NjdhMWIzOGYzOWFiZjMxY2YwNmUzYzMw',
        },
      ],
    },
  },
};
export const previewGetFollowingSuggestion = {
  data: {
    getFollowingSuggestion: {
      searchingUserId: '678e1e9179fd42a3a41c8dfe',
      user: {
        userName: 'dev',
        fullName: 'devdev',
        bio: 'devedeededede',
        profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
        hasStory: false,
        gender: 'male',
        isPrivate: false,
        email: 'dev@gmail.com',
        followingCount: 1,
        followerCount: 0,
        postCount: 4,
        latestStoryTimestamp: 0,
        seenStoryTime: 0,
        savedUsers: ['6789fe2e6ac4e4a4329b877d'],
        friendshipStatus: {
          followedBy: false,
          following: true,
          incomingRequest: false,
          outgoingRequest: false,
        },
        mutualFollowersCount: 0,
        mutualFollowers: '',

        _id: '678e1e9179fd42a3a41c8dfe',
      },
    },
  },
};
