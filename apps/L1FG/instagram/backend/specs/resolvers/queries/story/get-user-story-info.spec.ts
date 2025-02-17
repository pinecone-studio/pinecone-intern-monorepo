import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { getUserStoryInfo } from 'apps/L1FG/instagram/backend/src/resolvers/queries/story/get-user-story-info';
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Get user story info', () => {
  it('Should work', async () => {
    const mockAggregate = jest.fn().mockResolvedValueOnce([]);
    (UserModel.aggregate as jest.Mock) = mockAggregate;
    const result = await getUserStoryInfo({ userId: '67aa92d76fa444653ad6d4b5' });
    expect(result).toEqual([]);
  });
});
