import gql from 'graphql-tag';

export const commentsSchema = gql`
  type CommentType {
    _id: ID
    comment: String
  }

  type Query {
    getComments: [CommentType]
  }
`;
