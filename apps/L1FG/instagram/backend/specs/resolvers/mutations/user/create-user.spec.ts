import { createUser } from "apps/L1FG/instagram/backend/src/resolvers/mutations/user";
import { GraphQLResolveInfo } from "graphql"

jest.mock('../../../../src/models/user.model', () => ({
  UserModel: {
    create: jest.fn().mockReturnValue({
      input: {
        bio: "",
        fullName: "Tuul",
        gender: "not_know",
        hasStory: false,
        isPrivate: false,
        password: "1234",
        profileImage: "",
        userName: "Enkhtuul",
      }
    })
  }
}));

describe('Create user', () => {
  it('should create a user', async () => {
    const input = {
      bio: "",
      fullName: "",
      gender: "",
      hasStory: false,
      isPrivate: false,
      password: "",
      profileImage: "",
      userName: "",
    };

    const result = await createUser!(
      {}, 
      { input }, 
      {},
      {} as GraphQLResolveInfo
    );

    expect(result).toEqual({
      input: {
        bio: "",
        fullName: "Tuul",
        gender: "not_know",
        hasStory: false,
        isPrivate: false,
        password: "1234",
        profileImage: "",
        userName: "Enkhtuul",
      }
    });

  });
});
