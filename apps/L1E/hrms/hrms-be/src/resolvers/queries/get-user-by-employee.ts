import { UserModel } from '../../models/user.model';

export const getUserController = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await UserModel.findById(userId).select('username email');
    if (!user) {
      return res.status(404).send({ message: 'Хэрэглэгч олдсонгүй' });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
