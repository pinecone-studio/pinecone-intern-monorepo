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
    contentPost: String
  }
  type NotificationGroup {
    today: [NotificationType]!
    yesterday: [NotificationType]!
    thisWeek: [NotificationType]!
    earlier: [NotificationType]!
  }

  input NotificationInput {
    categoryType: CategoryEnum
    userId: ID!
    actorId: ID!
    contentPostId: String
    contentCommentId: String
    contentStoryId: String
  }

  type Query {
    getNotification: NotificationGroup
  }
`;
