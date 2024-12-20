import gql from 'graphql-tag';

export const typeDefs = gql`
  enum RequestStatus {
    PENDING
    APPROVED
    REJECTED
  }

  enum RequestType {
    FREE
    PAID_LEAVE
    REMOTE
  }

  type Request {
    _id: ID!
    employeeId: Employee!
    leadEmployeeId: Employee
    requestStatus: RequestStatus!
    requestType: RequestType!
    reason: String
    reasonRefuse: String
    startTime: String!
    endTime: String!
    updatedAt: String!
    createdAt: String!
  }

  type RequestList {
    requests: [Request]
    totalCount: Int
  }

  input RequestInput {
    employeeId: ID!
    leadEmployeeId: ID
    requestStatus: RequestStatus!
    reason: String
    reasonRefuse: String
    startTime: String!
    endTime: String!
  }

  input RequestUpdateInput {
    requestType: RequestType
    reasonRefuse: String
    updatedAt: String!
  }

  type Query {
    getRequestById(id: ID!): Request
    getRequestsByEmployee(employee_id: ID!, page: Int, limit: Int): RequestList
    getAllRequests(page: Int, limit: Int): RequestList
  }

  type Mutation {
    createRequest(input: RequestInput!): Request
    updateRequest(id: ID!, input: RequestUpdateInput!): Request
    deleteRequest(id: ID!): Boolean
  }
`;
