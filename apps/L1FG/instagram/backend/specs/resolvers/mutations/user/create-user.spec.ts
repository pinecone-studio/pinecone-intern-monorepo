import { createUser } from "apps/L1FG/instagram/backend/src/resolvers/mutations/user";
import { GraphQLResolveInfo } from "graphql"

jest.mock('../../../../src/models', () => ({
  UserModel: {
    create: jest.fn().mockReturnValue({
     userName:"jordan",
     fullName:"jordan mike",
     email:"jordan@gmail.com",
     bio:"",
     password:"jordan1234",
     isPrivate:false,
     hasStory:false,
     profileImage:'http://image',
     gender:'not_know'
    })
  }
}));

describe('Create user', () => {
  it('should create a user', async () => {
    const input = {
      fullName: "jordan mike",
      password: "1234",
      userName: "jordan",
      email:"jordan@gmail.com"
    }

    const result = await createUser!(
      {}, 
      { input }, 
      {},
      {} as GraphQLResolveInfo
    );
 console.log('result is:',result)
    expect(result).toEqual({
      userName:"jordan",
      fullName:"jordan mike",
      email:"jordan@gmail.com",
      bio:"",
      password:"jordan1234",
      isPrivate:false,
      hasStory:false,
      profileImage:'http://image',
      gender:'not_know'
     });

  });
});
