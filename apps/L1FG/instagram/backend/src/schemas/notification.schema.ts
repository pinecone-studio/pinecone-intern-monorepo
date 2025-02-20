import gql from 'graphql-tag';

export const NotificationTypeDefs = gql`
  enum CategoryEnum {
    POST_LIKE
    COMMENT_LIKE
    REQUEST
    FOLLOWING
    POST_COMMENT
    STORY_LIKE
  }

  type NotificationCategory {
    postLike: [NotificationType]
    comment: [NotificationType]
    request: [NotificationType]
    commentLike: [NotificationType]
  }

  type NotificationType {
    id: ID
    categoryType: CategoryEnum
    userId: ID
    ownerId: ID
    contentPostId: String
    contentCommentId: String
    contentStoryId: String
    isRead: Boolean
    createdAt: Date
    updatedAt: Date
    user: UserTogetherUserType
    contentPost: UserPostType
    contentComment: String
    request: String
  }
  type NotificationGroup {
    today: [NotificationType]
    thisWeek: [NotificationType]
    thisMonth: [NotificationType]
    earlier: [NotificationType]
  }

  type NotificationResponseType {
    today: NotificationCategory
    thisWeek: NotificationCategory
    thisMonth: NotificationCategory
    earlier: NotificationCategory
  }

  type UpdateType {
    isRead: Boolean
  }

  type Mutation {
    updateIsRead: UpdateType
  }

  type Query {
    getNotification: NotificationResponseType
  }
`;
