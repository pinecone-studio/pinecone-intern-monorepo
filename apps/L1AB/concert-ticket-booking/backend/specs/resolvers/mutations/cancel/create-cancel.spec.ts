import { createCancel } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  cancelModel: {
    create: jest.fn().mockResolvedValue({
      bankName: 'golomt',
      bankAccount: 11,
      eventId: '222',
      userId: 'dfff',
      status: 'fff',
      amountTotal: 11,
    }),
  },
}));

describe('createCancel', () => {
  it('should create cancel booking', async () => {
    const cancelData = {
      input: {
        bankName: 'golomt',
        bankAccount: 11,
        eventId: '222',
        userId: 'dfff',
        status: 'fff',
        amountTotal: 11,
      },
    };

    const res = await createCancel!({}, cancelData, { userId: 'id' }, {} as GraphQLResolveInfo);
    expect(res).toEqual({
      bankName: 'golomt',
      bankAccount: 11,
      eventId: '222',
      userId: 'dfff',
      status: 'fff',
      amountTotal: 11,
    });
  });
});
