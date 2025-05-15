import gql from 'graphql-tag';
export const typeDefs = gql`
input PriceRangeInput {
  min: Float
  max: Float
}

input PostFilterInput {
  type: [PropertyType]
  location: LocationInput
  price: PriceRangeInput
  totalRooms: [Int]
  restrooms: [Int]
  garage: Boolean
  lift: Boolean
  balcony: Boolean
}

 type Query {
  filterPosts(filter: PostFilterInput): [Post!]
}
`;