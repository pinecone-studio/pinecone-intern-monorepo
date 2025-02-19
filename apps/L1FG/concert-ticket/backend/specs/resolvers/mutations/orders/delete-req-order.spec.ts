import { deleteReqDone } from 'apps/L1FG/concert-ticket/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/order-delete-req.model.ts', () => ({
  DeleteOrderReqModel: { findByIdAndDelete: jest.fn().mockResolvedValueOnce({}).mockResolvedValueOnce(null) },
}));
describe('order delete ', () => {
  it('should order delete', async () => {
    const result = await deleteReqDone!({}, { orderReqId: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({});
  });
});
