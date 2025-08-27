import { gql } from 'apollo-server-cloud-functions';

export const foodTypeDefs = gql`
  type Food {
    foodId: ID!
    foodName: String!
    price: String!
    image: String!
    foodStatus: String!
    category: Category!
    discount: Discount
    createdAt: String
    updatedAt: String
  }

  input CreateFoodInput {
    foodName: String!
    price: String!
    image: String!
    foodStatus: String!
    categoryId: ID!
  }

  input UpdateFoodInput {
    foodName: String
    price: String
    image: String
    foodStatus: String!
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
    updateFoodByDiscount(foodId: ID!, discountId: ID!): Food!
  }
`;
