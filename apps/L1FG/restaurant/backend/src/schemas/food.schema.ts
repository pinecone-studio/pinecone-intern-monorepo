import gql from 'graphql-tag';

export const foodTypeDefs = gql`
  scalar JSON
  scalar Date

  enum Response {
    Success
    Failure
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

  input EditFoodInput {
    foodId: ID!
    foodName: String
    imageUrl: String
    price: Float
    status: String
    categoryId: ID
  }

  type UpdatedFoodType {
    foodId: ID!
    categoryId: ID!
  }

  type DeleteResponse {
    status: Response!
    message: String!
  }

  input DeleteFoodCateType {
    id: ID!
  }

  type Query {
    sampleQuery: String!
    getFoods: [FoodType!]!
  }

  type Mutation {
    sampleMutation: String!
    updateFoodCategory(input: UpdateFoodType!): UpdatedFoodType!
    createFood(input: FoodInputType!): FoodType!
    updateFood(input: EditFoodInput!): FoodType!
    deleteFood(foodId: ID!): DeleteResponse!
    deleteFoodCategory(input: DeleteFoodCateType!): DeleteResponse!
  }
`;
