import { gql } from 'apollo-server-cloud-functions';

export const foodTypeDefs = gql`
  type Food {
    foodId: ID!
    foodName: String!
    price: String!
    image: String!
    status: String!
    category: Category!
    createdAt: String
    updatedAt: String
  }

  input CreateFoodInput {
    foodName: String!
    price: String!
    image: String!
    status: String!
    categoryId: ID!
  }

  input UpdateFoodInput {
    foodName: String
    price: String
    image: String
    status: String
    categoryId: ID
  }

  type Query {
    getFoodById(foodId: ID!): Food!
    getFoods: [Food]!
  }

  type Mutation {
    createFood(input: CreateFoodInput!): Food!
    updateFood(foodId: ID!, input: UpdateFoodInput!): Food!
    deleteFood(foodId: ID!): Food!
  }
`;
