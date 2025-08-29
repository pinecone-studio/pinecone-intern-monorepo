import { gql } from 'apollo-server-cloud-functions';

export const foodTypeDefs = gql`
  type Food {
    foodId: ID!
    foodName: String!
    price: String!
    image: String!
    foodStatus: String!
    category: Category
    discount: Discount
    createdAt: String
    updatedAt: String
  }

  input CreateFoodInput {
    foodName: String!
    price: String!
    image: String!
    foodStatus: String!
  }

  input UpdateFoodInput {
    foodName: String
    price: String
    image: String
    foodStatus: String!
  }

  type Query {
    getFoods: [Food]!
    getFoodById(foodId: ID!): Food!
    getFoodsByStatus(foodStatus: String!): [Food]!
  }

  type Mutation {
    createFood(input: CreateFoodInput!): Food!
    updateFood(foodId: ID!, input: UpdateFoodInput!): Food!
    deleteFood(foodId: ID!): Food!
    addFoodToCategory(categoryId: ID!, foodId: ID!): [Food!]
    addFoodToDiscount(discountId: ID!, foodId: ID!): [Food!]
    deleteFoodFromCategory(categoryId: ID!, foodId: ID!): Food!
    deleteFoodFromDiscount(discountId: ID!, foodId: ID!): Food!
  }
`;
