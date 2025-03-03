import { OrderModel, UserModel } from '../../../../src/models';
import { orderUpdate } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/user.model.ts', () => ({
  UserModel: {
    findById: jest.fn().mockImplementation(async ({ _id }) => {
      if (_id === '67a191128304c300a5e45497') {
        return { _id, password: '1', email: 'old@example.com' };
      }
      return null;
    }),
    findByIdAndUpdate: jest.fn().mockImplementation(async ({ _id }, update) => ({
      _id,
      password: '1',
      email: update.email,
    })),
  },
}));

jest.mock('apps/L1FG/concert-ticket/backend/src/models/order.model.ts', () => ({
  OrderModel: {
    updateMany: jest.fn().mockReturnValue({}),
  },
}));

describe('order update', () => {
  it('1. Order update successfully', async () => {
    const result = await orderUpdate!({}, { input: { newEmail: 'zaya@example.com', newPhoneNumber: '1111', userId: '67a191128304c300a5e45497' } }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '67a191128304c300a5e45497',
      password: '1',
      email: 'zaya@example.com',
    });

    expect(UserModel.findById).toHaveBeenCalledWith({ _id: '67a191128304c300a5e45497' });
    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith({ _id: '67a191128304c300a5e45497' }, { email: 'zaya@example.com' }, { new: true });
    expect(OrderModel.updateMany).toHaveBeenCalledWith({ userID: '67a191128304c300a5e45497' }, { phoneNumber: '1111' });
  });

  it('2. User not found', async () => {
    await expect(orderUpdate!({}, { input: { newEmail: 'zaya@example.com', newPhoneNumber: '1111', userId: '67a191128304c300a5e45491' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(
      'Хэрэглэгчийн имэйл олдсонгүй'
    );
  });
});
