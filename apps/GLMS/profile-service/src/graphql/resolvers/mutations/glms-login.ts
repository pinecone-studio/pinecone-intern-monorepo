import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { MutationResolvers } from '@/graphql/generated';
import glmsUserModel from '@/graphql/models/user.model';

export const glmsSignIn: MutationResolvers['glmsLogIn'] = async (_, { logInput }) => {
  try {
    const email = logInput?.email;
    const password = logInput?.password;
    const user = await glmsUserModel.findOne({ email: email, password: password });

    if (!user) {
      throw new GraphQLError('Incorrect email or password');
    }

    const id = user._id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const userEmail = user.email;
    const role = user.role;
    const avatar = user.avatar;

    const token = jwt.sign({ id, firstName, lastName, userEmail, role, avatar }, 'temporary-secret-key');

    return { token, message: 'Successful authentication' };
  } catch (error) {
    throw new GraphQLError('Sign in failure');
  }
};
