import gql from "graphql-tag";

export const typeDefs = gql`
type Comment {
_id: ID!
text: String!
userId: User!
createdAt: Date!
}
`