import { UserModel } from '../../../models/user.model';

export const getAllUsers = async () => {
  try {
    const allUsers = await UserModel.find({});        
    return allUsers;
  } catch (error) {
    console.error(error);
    throw new Error('cannot fetch all Users');
  }
};
