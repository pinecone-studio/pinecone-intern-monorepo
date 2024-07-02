import { UserModel } from '@/graphql/models';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { MutationResolvers } from '@/graphql/generated';

export const reportSignIn: MutationResolvers['reportSignIn'] = async (_, { input }) => {
  try {
    const email = input?.email;
    const password = input?.password;
    const user = await UserModel.findOne({ email: email, password: password });

    if (!user) {
      throw new GraphQLError('Incorrect email or password');
    }

    const id = user._id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const userEmail = user.email;
    const role = user.role;

    const token = jwt.sign({ id, firstName, lastName, userEmail, role }, 'temporary-secret-key');

    return { token, message: 'Successful authentication' };
  } catch (error) {
    throw new GraphQLError('Sign in failure');
  }
};
