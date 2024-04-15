import { getContents } from '@/graphql/resolvers/queries';
import contentModel from '@/model/create-content-model';

jest.mock('@/model/create-content-model', () => ({
  find: jest.fn(),
}));
describe('getContents', () => {
  it('should return content from contentModel', async () => {
    const content = [{ title: 'content 1' }, { title: 'content 2' }];
    (contentModel.find as jest.Mock).mockResolvedValue(content);
    const result = await getContents();
    expect(result).toEqual(content);

    expect(contentModel.find).toHaveBeenCalledTimes(1);
  });
});
