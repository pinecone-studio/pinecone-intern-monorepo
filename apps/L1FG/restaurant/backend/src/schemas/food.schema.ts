import gql from 'graphql-tag';

export const foodTypeDefs = gql`
  scalar JSON
  scalar Date

  enum Response {
    Success
  }

  input FoodInputType {
    foodName: String!
    imageUrl: String!
    price: Float!
    status: String!
    categoryId: ID
  }

  type FoodType {
    id: ID!
    foodName: String!
    imageUrl: String!
    price: Float!
    status: String!
    categoryId: ID
    createdAt: Date!
  }

  input UpdateFoodType {
    foodId: ID!
    categoryId: ID!
  }

  type Query {
    sampleQuery: String!
    getFoods: [FoodType!]!
  }

  type UpdatedFoodType {
    foodId: ID!
    categoryId: ID!
  }

  type Mutation {
    sampleMutation: String!
    updateFoodCategory(input: UpdateFoodType!): UpdatedFoodType!
    createFood(input: FoodInputType!): FoodType!
  }
`;
