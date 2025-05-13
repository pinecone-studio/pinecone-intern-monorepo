import bcrypt from 'bcryptjs';
import { userModel } from '../../models';
import { MutationResolvers } from '../../generated';

const changeCurrentPassword: MutationResolvers['changeCurrentPassword'] = async (_, { currentPassword, newPassword, email }) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error('Хэрэглэгч олдсонгүй.');
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error('Хуучин нууц үг буруу байна.');
  }

  if (currentPassword === newPassword) {
    throw new Error('Шинэ нууц үг хуучинтой ижил байна.');
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  const updatedUser = await userModel.findByIdAndUpdate(user.id, {
    password: hashed,
  });

  return updatedUser;
};

export default changeCurrentPassword;
