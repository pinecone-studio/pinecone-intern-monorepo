import { RequestModel } from 'apps/L1FG/instagram/backend/src/models';
import { request } from 'apps/L1FG/instagram/backend/src/resolvers/notification/notification-type';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('notification post populate type', () => {
  it('shoud have post image', async () => {
    if (!request) {
      return;
    }

    (RequestModel.findOne as jest.Mock).mockResolvedValue({
      status: 'PENDING',
    });

    const result = await request({ userId: '1', ownerId: '2' }, {}, {});
    expect(result).toEqual('PENDING');
  });
  it('shoud have post image', async () => {
    if (!request) {
      return;
    }

    const result = await request({ userId: null, ownerId: null }, {}, {});
    expect(result).toBeNull();
  });
  it('shoud have post image', async () => {
    if (!request) {
      return;
    }

    (RequestModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(request({ userId: '1', ownerId: '2' }, {}, {})).rejects.toThrow('not found request');
  });
});
