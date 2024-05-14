import { MutationResolvers } from '@/graphql/generated';
import UserModel from '@/model/user-model';
import { GraphQLError } from 'graphql';


export const signUp: MutationResolvers['signUp'] = async (_, { userInput }) => {
    console.log(userInput)
    
  try {
    const { email} = userInput;
    const orFilter =[{email}];
    const userExists = await UserModel.findOne({
      $or: orFilter.filter((item) => {
        return Object.values(item)[0];
      }),
    });

    if (!userExists) {
        const user = await UserModel.create(userInput);
        return user
    }
    throw new GraphQLError("Бүртгэлтэй хэрэглэгч байна")
  } catch (error) {
    throw new GraphQLError("Алдаа гарлаа")
  }
};
