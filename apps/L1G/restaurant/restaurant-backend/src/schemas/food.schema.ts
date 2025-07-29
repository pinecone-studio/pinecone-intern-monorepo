import { gql } from 'apollo-server-cloud-functions';

export const foodTypeDefs = gql`
  type Food {
    foodId: ID!
    foodName: String!
    image: String!
    price: String!
    status: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getFood(foodId: ID!): Food!
    getFoods: [Food!]!
  }

  type Mutation {
    createFood(input: CreateFoodInput!): Food!
    updateFood(foodId: ID!, input: UpdateFoodInput!): Food!
    deleteFood(foodId: ID!): Food!
  }

  input CreateFoodInput {
    foodName: String!
    price: String!
    image: String!
    status: String!
  }
  input UpdateFoodInput {
    foodName: String!
    price: String!
    image: String!
    status: String!
  }
`;
