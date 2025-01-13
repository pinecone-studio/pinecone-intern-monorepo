import gql from 'graphql-tag';

export const Post = gql`

scalar JSON

  enum Status {
    PENDING
    APPROVED
    DECLINED
  }

  type Post {
    propertyOwnerId: ID
    title: String
    description: String
    price: Int
    propertyDetail: ID
    status: Status
    updatedAt: String
    createdAt: String
  }

  type Query {
  getPost (_id: ID) : Post !
  getPosts [Post] !
  }

  type Mutations{
  createdPost(title: String): Post!
  updatedPost(_id : ID title: String): Post!
  deletedPost(_id : ID) : Post! 
  }
`;
