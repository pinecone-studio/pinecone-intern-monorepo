
import { getContents } from '@/graphql/resolvers/queries';
import contentModel from '@/model/create-content-model';

jest.mock('@/model/create-content-model', () => ({
  find: jest.fn(),
}));
describe('getContents', () => {
  it('should return content from contentModel', async () => {
    const content: any[] = [{ title: 'Course 1' }, { title: 'Course 2' }];
    (contentModel.find as jest.Mock).mockResolvedValue(content);
    const result = await getContents();
    expect(result).toEqual(content);

    expect(contentModel.find).toHaveBeenCalledTimes(1);
  });
  it('should handle error when contentModel.find fails', async () => {
  
    (contentModel.find as jest.Mock).mockRejectedValue(new Error('cannot find content'));

    await expect(getContents()).rejects.toThrow('cannot find content');

    expect(contentModel.find).toHaveBeenCalledTimes(2);
  });
});