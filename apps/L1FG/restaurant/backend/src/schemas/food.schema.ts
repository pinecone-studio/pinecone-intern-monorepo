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
    category_id: ID
  }

  type FoodType {
    id: ID!
    foodName: String!
    imageUrl: String!
    price: Float!
    status: String!
    category_id: ID
    createdAt: Date!
  }

  type Query {
    sampleQuery: String!
    getFoods: [FoodType!]!
  }

  type Mutation {
    sampleMutation: String!
    createFood(input: FoodInputType!): FoodType!
  }
`;
