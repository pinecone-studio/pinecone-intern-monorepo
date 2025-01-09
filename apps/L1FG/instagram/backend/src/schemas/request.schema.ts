import gql from "graphql-tag";

export const RequestTypeDefs = gql`
enum Episode {
accept
pending
remove
}

type Request {
_id:ID
from:ID!
to:ID!
status:[Episode]!
}

input RequestInput {
from:ID!
to:ID!
status:[Episode]!
}

type Mutation {
creteRequest(input:RequestInput!):Request!
}
`