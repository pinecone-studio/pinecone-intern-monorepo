import { MutationResolvers, User } from '../../../generated';
import { userModel } from '../../../models/user/user.model';

export const updateUser: MutationResolvers['updateUser'] = async (_: unknown, { _id, input }) => {
  const { email, username, age, bio, hobby, interest, job, profession } = input;

  const User = await userModel.findById(_id);

  if (!User) {
    throw new Error('User not found');
  }

  const user = await userModel.findByIdAndUpdate(
    {
      _id: _id,
    },
    {
      email,
      username,
      age,
      bio,
      hobby,
      interest,
      job,
      profession,
    },
    { new: true }
  );

  return user as User;
};
