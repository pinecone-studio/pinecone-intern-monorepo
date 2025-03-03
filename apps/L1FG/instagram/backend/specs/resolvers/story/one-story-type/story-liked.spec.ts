import { StoryLikeModal } from '../../../../src/models';
import { storyLiked } from '../../../../src/resolvers/story/one-story-type';
/*eslint-disable*/
import { authenticate } from '../../../../src/utils/authenticate';

jest.mock('../../../../src/utils/authenticate');
jest.mock('../../../../src/models');

describe('Story liked', () => {
  it('Should throw та нэвтэрнэ үү', async () => {
    const mockAuthenticate = jest.fn(() => {
      throw new Error('та нэвтэрнэ үү');
    });
    (authenticate as jest.Mock) = mockAuthenticate;
    await expect(storyLiked({ _id: '12' }, {}, { userId: '134' })).rejects.toThrow('та нэвтэрнэ үү');
  });
  it('Should return hasLiked true', async () => {
    (authenticate as jest.Mock) = jest.fn();
    const mockFindOne = jest.fn().mockResolvedValueOnce(null);
    (StoryLikeModal.findOne as jest.Mock) = mockFindOne;
    const result = await storyLiked({ _id: '12' }, {}, { userId: '134' });
    expect(result).toBe(false);
  });
  it('Should return hasLiked true', async () => {
    (authenticate as jest.Mock) = jest.fn();
    const mockFindOne = jest.fn().mockResolvedValueOnce({});
    (StoryLikeModal.findOne as jest.Mock) = mockFindOne;
    const result = await storyLiked({ _id: '12' }, {}, { userId: '134' });
    expect(result).toBe(true);
  });
});
