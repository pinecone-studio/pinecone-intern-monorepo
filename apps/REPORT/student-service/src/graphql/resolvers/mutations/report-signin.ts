import { UserModel } from '@/graphql/models';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { MutationResolvers } from '@/graphql/generated';

export const reportSignIn: MutationResolvers['reportSignIn'] = async (_, { input }) => {
  try {
    const { email, password } = input;
    const user = await UserModel.findOne({ email: email, password: password });

    if (!user) {
      throw new GraphQLError('Incorrect email or password');
    }

    if (user) {
      const id = user._id;
      const name = user.firstName;
      const userEmail = user.email;
      const role = user.role;

      const token = jwt.sign({ id, name, userEmail, role }, 'temporary-secret-key');

      return { token, message: 'Successful authentication' };
    }
  } catch (error) {
    throw new GraphQLError('Sign in failure');
  }
};
