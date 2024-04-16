
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
});