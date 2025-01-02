import gql from 'graphql-tag';

export const typeDefs = gql`
  enum RequestStatus {
    FREE
    PAID_LEAVE
    REMOTE
  }

  enum RequestType {
    PENDING
    APPROVED
    REJECTED
  }

  type Request {
    _id: ID!
    employeeId: ID
    leadEmployeeId: ID
    requestStatus: RequestStatus!
    requestType: RequestType!
    selectedDay: String
    reason: String
    reasonRefuse: String
    startTime: String
    endTime: String
    updatedAt: String!
    createdAt: String!
  }

  type RequestList {
    requests: [Request]
  }

  input RequestInput {
    employeeId: ID
    leadEmployeeId: ID
    requestStatus: RequestStatus!
    reason: String
    selectedDay: String
    reasonRefuse: String
    startTime: String
    endTime: String
  }

  input RequestUpdateInput {
    requestType: RequestType
    reasonRefuse: String
    updatedAt: String!
  }

  type Query {
    getRequestById(id: ID!): Request
    getRequestsByEmployee(employee_id: ID!, page: Int, limit: Int): RequestList!
    getAllRequests(limit: Int): [Request]
    getRequestsByEmployee(employeeId: ID!): [Request]
    getAllRequests(limit: Int): RequestList!
  }

  type Mutation {
    createRequest(input: RequestInput!): Request
    updateRequest(id: ID!, input: RequestUpdateInput!): Request
    deleteRequest(id: ID!): Boolean
  }
`;
