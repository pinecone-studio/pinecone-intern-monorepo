import { gql } from 'apollo-server-cloud-functions';

export const orderTypeDefs = gql`
  enum FoodOrderStatus {
    READY
    PREPARING
    DONE
    PENDING
  }

  type FoodOrderItem {
    food: Food!
    quantity: Int!
  }

  type FoodOrder {
    orderId: ID!
    orderNumber: Int!
    status: FoodOrderStatus!
    totalPrice: Int!
    user: User!
    table: Table!
    foodOrder: [FoodOrderItem!]!
  }

  input FoodOrderItemInput {
    foodId: ID!
    quantity: Int!
  }

  input CreateFoodOrderInput {
    totalPrice: Int!
    status: FoodOrderStatus
    user: ID!
    table: ID!
    FoodOrderItem: [FoodOrderItemInput!]!
  }

  input UpdateFoodOrderStatusInput {
    orderId: ID!
    status: FoodOrderStatus!
  }

  input DeleteFoodOrderInput {
    orderId: ID!
  }

  type Query {
    getFoodOrders: [FoodOrder!]!
  }

  type Mutation {
    createFoodOrder(input: CreateFoodOrderInput!): FoodOrder!
    updateFoodOrderStatus(input: UpdateFoodOrderStatusInput!): FoodOrder!
    deleteFoodOrder(input: DeleteFoodOrderInput!): FoodOrder!
  }
`;
