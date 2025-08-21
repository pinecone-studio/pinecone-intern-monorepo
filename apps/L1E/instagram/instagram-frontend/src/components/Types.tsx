import gql from "graphql-tag";

export type AuthUser = {
  fullName: string;
  userName: string;
  isPrivate: boolean;
  profileImage: string;
  bio: string;
  followers: {
    _id: string;
    userName: string;
    profileImage: string;
  }[];
  following: {
    _id: string;
    userName: string;
    profileImage: string;
  }[];
  posts: {
    _id: string;
    image: string;
    text: string;
    createdAt: string;
    likes: {
      _id: string;
      user: {
        _id: string;
        userName: string;
        profileImage: string;
      };
    }[];
    comments: {
      _id: string;
      text: string;
      createdAt: string;
      user: {
        _id: string;
        userName: string;
        profileImage: string;
      };
    }[];
  }[];
};

export type AuthUserResponse = {
  user: AuthUser;
};

export type AuthContextValue = {
    user: AuthUser | null;
    login: (_email: string, _password: string) => Promise<void>;
    logout: () => void;
  };
  
  export const LOGIN_MUTATION = gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        token
        user {
          fullName
          userName
          isPrivate
          profileImage
          bio
          followers {
            _id
            userName
            profileImage
          }
          following {
            _id
            userName
            profileImage
          }
          posts {
            _id
            image
            description
            createdAt
            likes {
              _id
              userId {
                _id
                userName
                profileImage
              }
            }
            comments {
              _id
              text
              createdAt
              userId {
                _id
                userName
                profileImage
              }
            }
            image
          }
        }
      }
    }
  `;

export type DecodedTokenType = {
    userId: string;
  };
  
