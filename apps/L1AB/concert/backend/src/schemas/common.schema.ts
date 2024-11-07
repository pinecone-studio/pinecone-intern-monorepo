import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  scalar Date
  type Task {
    _id: ID!
    taskName: String!
    isDone: Boolean
    priority: Int!
    createdAt: String
    updatedAt: String
  }
  enum Response {
    Success
  }

  type Query {
    sampleQuery: String!
    getAllTasks: [Task!]!
    getDoneTasksLists: [Task!]!
  }

  type Mutation {
    sampleMutation: String!
    addTask(taskName: String!, priority: Int!): Task
    updateTask(taskId: ID!, taskName: String, priority: Int, isDone: Boolean): Task
  }
`;
