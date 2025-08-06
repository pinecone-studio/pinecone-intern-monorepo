import gql from "graphql-tag";

export const typeDefs = gql`
scalar Date

type Like {
_id: ID!
userId: User!
createdAt: Date!
}
`