import gql from "graphql-tag";

export const typeDefs = gql`
type User {
_id: ID!
email: String!
fullName: String!
userName: String!
isPrivate: Boolean
profileImage: String
bio: String
followers: [User!]!
following: [User!]!
posts: [Post!]!
receivedRequests: [ReceivedRequest!]!
}

type Query {
getUsers: [User!]}
`