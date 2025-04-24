import gql from "graphql-tag";

export const UserTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    isAdmin: Boolean!
    phone: Int
    bookings: [Booking]!
    JWT: String
  }
`;
