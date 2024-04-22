
import { getSections } from '@/graphql/resolvers/queries/sections-get';
import sectionModel from '@/model/section-model';


jest.mock('@/model/section-model', () => ({
  find: jest.fn(),
}));
describe('getContents', () => {
  it('should return content from contentModel', async () => {
    const content = [{ title: 'Course 1' }, { title: 'Course 2' }];
    (sectionModel.find as jest.Mock).mockResolvedValue(content);
    const result = await getSections();
    expect(result).toEqual(content);

    expect(sectionModel.find).toHaveBeenCalledTimes(1);
  });
  it('should handle error when sectionModel.find fails', async () => {

    (sectionModel.find as jest.Mock).mockRejectedValue(new Error('cannot find content'));

    await expect(getSections()).rejects.toThrow('cannot find content');

    expect(sectionModel.find).toHaveBeenCalledTimes(2);
  });
});