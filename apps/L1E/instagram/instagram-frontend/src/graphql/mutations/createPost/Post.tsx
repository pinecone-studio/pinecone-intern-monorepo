"use client"
import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($image: [String!]!, $description: String) {
    createPost(image: $image, description: $description) {
      _id
      image
      description
      createdAt
    }
  }
`;

