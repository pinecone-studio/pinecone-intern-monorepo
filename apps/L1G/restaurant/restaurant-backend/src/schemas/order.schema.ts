import { gql } from 'apollo-server-cloud-functions';

export const orderTypeDefs = gql`
  enum FoodOrderStatus {
    READY
    PREPARING
    DONE
    PENDING
  }

  enum FoodServeType {
    IN
    GO
  }

  type FoodOrderItem {
    food: Food
    quantity: Int!
  }

  type FoodOrder {
    orderId: ID!
    orderNumber: Int!
    orderType: FoodServeType!
    status: FoodOrderStatus!
    totalPrice: Int!
    user: User
    table: Table
    foodOrder: [FoodOrderItem!]!
    createdAt: String
    updatedAt: String
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
    orderType: FoodServeType!
    bonusPointsToUse: Int
  }

  input UpdateFoodOrderStatusInput {
    orderId: ID!
    status: FoodOrderStatus!
  }

  input DeleteFoodOrderInput {
    orderId: ID!
  }

  input getFoodOrdersByUserInput {
    userId: ID!
  }

  type Query {
    getFoodOrders: [FoodOrder!]!
    getFoodOrdersByUser(input: getFoodOrdersByUserInput!): [FoodOrder]!
  }

  type Mutation {
    createFoodOrder(input: CreateFoodOrderInput!): FoodOrder!
    updateFoodOrderStatus(input: UpdateFoodOrderStatusInput!): FoodOrder!
    deleteFoodOrder(input: DeleteFoodOrderInput!): FoodOrder!
  }
`;
