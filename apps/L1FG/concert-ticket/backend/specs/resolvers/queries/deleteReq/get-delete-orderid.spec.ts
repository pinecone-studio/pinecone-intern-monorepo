import { getDeleteOrderId } from '../../../../src/resolvers/queries/deleteReq/get-delete-orderid';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/order-delete-req.model.ts', () => ({
  DeleteOrderReqModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce({
        concertName: 'aaa',
        totalPrice: 1111,
        userName: 'dodod',
        accountNumber: 3454,
        bankName: 'khan',
        orderId: '1',
        reqStatus: false,
        _id: '67b0622a8f6584e0270bf3e2',
        orderStatus: 'CANCEL',
      })
      .mockResolvedValueOnce(null),
  },
}));

describe('get delete orderid delete req', () => {
  it('order delete req successful', async () => {
    expect(await getDeleteOrderId!({}, { orderId: '1' }, {}, {} as GraphQLResolveInfo)).toEqual({
      concertName: 'aaa',
      totalPrice: 1111,
      userName: 'dodod',
      accountNumber: 3454,
      bankName: 'khan',
      orderId: '1',
      reqStatus: false,
      _id: '67b0622a8f6584e0270bf3e2',
      orderStatus: 'CANCEL',
    });
  });
  it('not found order delete req', async () => {
    await expect(getDeleteOrderId!({}, { orderId: 'wrong' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new Error('Захиалга цуцлах хүсэлт байхгүй байна'));
  });
});
