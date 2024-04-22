import { gql } from 'graphql-tag';

export const reactionSchema = gql`
  type Reaction {
    id: ID!
    emoji: String!
    users: [User]
    count: Int!
    articleId: Article
    category: Category
  }

  enum EmojiEnum {
    like
    dislike
  }

  type Query {
    getReactionByArticleId(articleId: ID!): [Reaction]
  }
`;
