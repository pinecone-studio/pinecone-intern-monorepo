import gql from "graphql-tag";

export const ReceivedRequestTypeDefs = gql`
scalar Date

type ReceivedRequest {
_id: ID!,
receiverId: User!,
senderId: User!,
createdAt: Date!
}
`