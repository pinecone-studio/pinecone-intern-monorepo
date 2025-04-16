import { GraphQLError } from 'graphql';
import { User } from '../generated';
import { UserModel } from '../models';

export async function checkUserExist({ email, username, phone }: { email: string; username: string; phone: number }) {
  try {
    const userExist = await UserModel.findOne<User>({ $or: [{ email }, { username }, { phone }] });
    if (userExist) {
      throw new GraphQLError('Хэрэглэгч бүртгэлтэй байна!');
    }
  } catch (err) {
    console.error(err);
  }
}
