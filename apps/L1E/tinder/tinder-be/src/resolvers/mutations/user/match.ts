import { MutationResolvers, User } from '../../../generated';
import { userModel } from '../../../models/user/user.model';

export const updateMatch: MutationResolvers['updateMatch'] = async (_: unknown, { userId, matchId }) => {
  console.log(userId, matchId);

  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (!Array.isArray(user.match)) {
    throw new Error('Match field is not an array');
  }

  if (user.match.includes(matchId)) {
    throw new Error('Match ID already exists for this user');
  }

  user.match.push(matchId);
  await user.save();

  return user as unknown as User;
};
