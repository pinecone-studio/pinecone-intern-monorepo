/* eslint-disable max-lines */
import { CommentLike } from '@/components/notifications/CommentLike';
import { render } from '@testing-library/react';

const likeNotificationMock = [
  {
    categoryType: 'POST_LIKE',
    contentPostId: null,
    contentComment: 'mmm',
    createdAt: '2025-02-15',
    contentPost: {
      _id: '1',
      postImage: 'post.png',
      user: {
        _id: '',
        userName: 'b',
        profileImage: 'user.png',
      },
    },
    _id: '12',
    isRead: false,
    ownerId: '1',
    user: {
      _id: '1',
      userName: 'search',
      profileImage: 'user.png',
    },
  },
  {
    categoryType: 'POST_LIKE',
    contentPostId: '1',
    contentComment: 'mmm',
    createdAt: '2025-02-15',
    contentPost: {
      _id: '1',
      postImage: 'post.png',
      user: {
        _id: '',
        userName: 'b',
        profileImage: 'user.png',
      },
    },
    _id: '12',
    isRead: false,
    ownerId: '1',
    user: {
      _id: '3',
      userName: 'search',
      profileImage: 'user.png',
    },
  },
  {
    categoryType: 'POST_LIKE',
    contentPostId: '1',
    contentComment: 'mmm',
    createdAt: '2025-02-15',
    contentPost: {
      _id: '1',
      postImage: 'post.png',
      user: {
        _id: '',
        userName: 'b',
        profileImage: 'user.png',
      },
    },
    _id: '12',
    isRead: false,
    ownerId: '1',
    user: {
      _id: '2',
      userName: 'john',
      profileImage: 'john.png',
    },
  },
];

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('post comment component', () => {
  it('should handle notifications without contentPostId', () => {
    const mockNotifications = [
      {
        categoryType: 'POST_LIKE',
        contentPostId: null,
        contentPost: {
          _id: '1',
          postImage: 'post.png',
        },
        _id: '12',
        isRead: false,
        ownerId: '1',
        user: {
          _id: '',
          userName: 'search',
          profileImage: 'user.png',
        },
      },
    ];

    const groupedPostLikes = mockNotifications.reduce((acc, notification) => {
      const postId = notification.contentPostId;
      if (!postId) {
        return acc;
      } // ✨ `null` үед энэ мөр гүйцэтгэгдэх ёстой

      acc[postId] = acc[postId] || [];
      acc[postId].push(notification);
      return acc;
    }, {} as Record<string, typeof mockNotifications>);

    expect(groupedPostLikes).toEqual({});
  });

  it('should handle notifications without contentPostId', () => {
    const mockNotifications = [
      {
        categoryType: 'POST_LIKE',
        contentPostId: null,
        contentPost: {
          _id: '1',
          postImage: 'post.png',
        },
        _id: '12',
        isRead: false,
        ownerId: '1',
        user: {
          _id: '2',
          userName: 'search',
          profileImage: 'user.png',
        },
      },
    ];

    const groupedPostLikes = mockNotifications.reduce((acc, notification) => {
      const postId = notification.contentPostId;
      if (!postId) {
        return acc;
      }

      if (!acc[postId]) {
        acc[postId] = [];
      }
      acc[postId].push(notification);
      return acc;
    }, {} as Record<string, typeof mockNotifications>);

    expect(groupedPostLikes).toEqual({});
  });
  it('filters and groups notifications correctly', async () => {
    const groupedPostLikes = likeNotificationMock.reduce((acc, notification) => {
      const postId = notification.contentPostId;
      if (!postId) {
        return acc;
      }

      if (!acc[postId]) {
        acc[postId] = [];
      }

      acc[postId].push(notification);
      return acc;
    }, {} as Record<string, typeof likeNotificationMock>);

    const groupedNotifications = Object.entries(groupedPostLikes).map(([postId, likes]) => {
      const validLikes = likes.filter((like) => like.user?.userName);
      const latestLikes = validLikes.slice(-3);

      return {
        postId,
        userNames: latestLikes.map((like) => like.user?.userName ?? 'Unknown'),
        postImage: likes[0]?.contentPost,
        userImage: latestLikes[latestLikes.length - 1]?.user?.profileImage ?? '',
        comment: likes[0].contentComment,
      };
    });

    expect(groupedNotifications).toEqual([
      {
        postId: '1',
        userNames: ['search', 'john'],
        comment: 'mmm',
        postImage: {
          _id: '1',
          postImage: 'post.png',
          user: {
            _id: '',
            userName: 'b',
            profileImage: 'user.png',
          },
        },
        userImage: 'john.png',
      },
    ]);
    // const button = await screen.findByText('search');
    // fireEvent.click(button);

    // expect(mockPush).toHaveBeenCalledWith('/2');
  });

  it('renders CommentPost component', () => {
    render(<CommentLike commentNotification={[]} />);
  });
  it('renders CommentPost component', () => {
    render(<CommentLike commentNotification={likeNotificationMock as []} />);
  });
});
