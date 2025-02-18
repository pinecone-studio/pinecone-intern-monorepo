import { createDeleteReq } from 'apps/L1FG/concert-ticket/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/order.model.ts', () => ({
  OrderModel: {
    findById: jest
      .fn()
      .mockResolvedValueOnce({ userID: '1', _id: '1', createdAt: '2025-03-30T09:41:50.710+00:00' })
      .mockResolvedValueOnce({ userID: '1', _id: '1', createdAt: '2025-02-05T09:41:50.710+00:00' }),
  },
}));

jest.mock('apps/L1FG/concert-ticket/backend/src/models/order-delete-req.model.ts', () => ({
  DeleteOrderReqModel: {
    create: jest.fn().mockResolvedValue({ concertName: 'after hours', totalPrice: 11, userName: 'test', accountNumber: 1111, bankName: 'khan', orderId: '1', reqStatus: false, _id: '1' }),
  },
}));

describe('create delete req', () => {
  it('ticket reservation delete req successfull', async () => {
    expect(
      await createDeleteReq!(
        {},
        { input: { concertName: 'after hours', totalPrice: 11, userName: 'test', accountNumber: 1111, bankName: 'khan', orderId: '1', reqStatus: false } },
        {},
        {} as GraphQLResolveInfo
      )
    );
  });
  it('ticket reservation delete req feils and req time out', async () => {
    const result = createDeleteReq!(
      {},
      { input: { concertName: 'after hours', totalPrice: 11, userName: 'test', accountNumber: 1111, bankName: 'khan', orderId: '1', reqStatus: false } },
      {},
      {} as GraphQLResolveInfo
    );
    expect(result).rejects.toThrow('Тасалбар устгах хугацаа дууссан байна');
  });
});
