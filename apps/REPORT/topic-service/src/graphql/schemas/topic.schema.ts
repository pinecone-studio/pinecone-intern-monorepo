import gql from 'graphql-tag';

export const topicsSchema = gql`
  scalar Date

  type Topic {
    _id: ID!
    name: String!
    description: String!
    comments: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateTopicInput {
    name: String!
    description: String!
    comments: String!
  }

  input UpdateTopicInput {
    _id: ID!
    name: String
    description: String
    comments: String
  }

  type Query {
    getTopics: [Topic!]!
  }

  type Mutation {
    createTopic(input: CreateTopicInput!): Topic!
    deleteTopic(topicId: ID!): String!
    updateTopic(input: UpdateTopicInput!): Topic!
  }
`;
