import gql from 'graphql-tag';

export const MutationTypeDefs = gql`
  type Mutation {
    register(input: RegisterInput!): User!
    login(input: LoginInput!): User!
    addCategory(input: AddCategoryInput): Category!
    updateCategory(input: UpdateCategoryInput): Category!
    deleteCategory(input: DeleteCategoryInput): Category!
    sampleMutation: String!
    addProduct(input: AddProductInput!): Product
    updateProduct(input: UpdateProductInput!): Product
    deleteProduct(input: DeleteProductInput!): Product
    createOrder(products: [OrderProductInput!]!, userId: String!): Order!
  }
`;
