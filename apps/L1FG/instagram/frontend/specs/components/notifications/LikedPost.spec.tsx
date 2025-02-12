import { LikedPost } from '@/components/notifications/LikedPost';
import { render } from '@testing-library/react';

const commentNotificationMock = [
  {
    categoryType: 'COMMENT_POST',
    postContent: '.png',
    contentCommentId: '1',
    contentPostId: '123',
    contentStoryId: '',
    id: '12',
    isRead: false,
    ownerId: '1',
    user: {
      userName: 'search',
      profileImage: 'pro.png',
      latestStoryTimestamp: '2025',
      seenStoryTime: '2200',
      _id: '21',
    },
  },
  {
    categoryType: 'COMMENT_POST',
    postContent: '.jpg',
    contentCommentId: '2',
    contentPostId: '123',
    contentStoryId: '',
    id: '13',
    isRead: false,
    ownerId: '2',
    user: {
      userName: 'john',
      profileImage: 'john.png',
      latestStoryTimestamp: '2026',
      seenStoryTime: '2300',
      _id: '22',
    },
  },
  {
    categoryType: 'COMMENT_POST',
    postContent: '.gif',
    contentCommentId: '3',
    contentPostId: '',
    contentStoryId: '',
    id: '14',
    isRead: false,
    ownerId: '3',
    user: {
      userName: 'doe',
      profileImage: 'doe.png',
      latestStoryTimestamp: '2027',
      seenStoryTime: '2400',
      _id: '23',
    },
  },
];

describe('post comment component', () => {
  it('filters and groups notifications correctly', async () => {
    const groupedPostLikes = commentNotificationMock.reduce((acc, notification) => {
      const postId = notification.contentPostId;
      if (!postId) {
        return acc;
      }

      if (!acc[postId]) {
        acc[postId] = [];
      }

      acc[postId].push(notification);
      return acc;
    }, {} as Record<string, typeof commentNotificationMock>);

    const groupedNotifications = Object.entries(groupedPostLikes).map(([postId, likes]) => {
      const validLikes = likes.filter((like) => like.user?.userName);
      const latestLikes = validLikes.slice(-3);

      return {
        postId,
        userNames: latestLikes.map((like) => like.user?.userName ?? 'Unknown'),
        postImage: likes[0]?.postContent ?? '',
        userImage: latestLikes[latestLikes.length - 1]?.user?.profileImage ?? '',
      };
    });

    expect(groupedNotifications).toEqual([
      {
        postId: '123',
        userNames: ['search', 'john'],
        postImage: '.png',
        userImage: 'john.png',
      },
    ]);
  });

  it('renders CommentPost component', () => {
    render(<LikedPost likeNotification={commentNotificationMock as []} />);
  });
});
