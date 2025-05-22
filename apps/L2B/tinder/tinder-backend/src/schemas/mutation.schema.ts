// import gql from 'graphql-tag';

export const mutationTypeDefs = `
  scalar Upload

  type Mutation {
    uploadImage(file: Upload!, userId: String!): String!
    uploadUserImages(userId: String!, imageUrls: [String!]!): Boolean!
  }
`;
