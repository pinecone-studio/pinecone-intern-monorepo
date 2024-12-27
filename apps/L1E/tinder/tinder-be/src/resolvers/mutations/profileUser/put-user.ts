import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models/user/user.model';

export const updateUser: MutationResolvers['updateUser'] = async (_: unknown, { _id, input }) => {
  const { email, username, age, bio, hobby, interest, job, profession, images } = input;
  console.log({ email });

  const User = await userModel.findById(_id);
  console.log(User);

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
      images,
      age,
      bio,
      hobby,
      interest,
      job,
      profession,
    },
    { new: true }
  );

  return user;
};
