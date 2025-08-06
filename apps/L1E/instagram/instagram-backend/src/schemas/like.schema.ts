import gql from "graphql-tag";

export const typeDefs = gql`
type Like {
_id: ID!
userId: User!
createdAt: Date!
}
`