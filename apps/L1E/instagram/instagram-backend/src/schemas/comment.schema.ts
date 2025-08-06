import gql from "graphql-tag";

export const typeDefs = gql`
scalar Date

type Comment {
_id: ID!
text: String!
userId: User!
createdAt: Date!
}
`