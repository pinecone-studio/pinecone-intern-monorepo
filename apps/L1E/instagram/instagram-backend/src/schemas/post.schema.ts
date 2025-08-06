import gql from "graphql-tag";

export const typeDefs = gql`
scalar Date

type Post {
_id: ID!
image: [String!]!
description: String
likes: [User!]!
comment: [User!]!
createdAt: Date!
}
`