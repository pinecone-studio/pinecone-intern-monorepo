import { gql } from 'graphql-tag';

export const userSchema = gql`
  type User {
    id: ID!
    name: String
    email: String
    avatar: String
    role: String
    articles: [Article]
  }
`;
