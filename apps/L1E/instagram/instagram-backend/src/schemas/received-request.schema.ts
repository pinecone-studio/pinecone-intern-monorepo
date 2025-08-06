import gql from "graphql-tag";

export const typeDefs = gql`
scalar Date

type ReceivedRequest {
_id: ID!
receiverId: User!
senderId: User!
createdAt: Date!
}
`