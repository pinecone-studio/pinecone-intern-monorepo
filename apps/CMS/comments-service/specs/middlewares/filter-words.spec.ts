import { filterWords } from '@/middlewares/filter-words';
import Filter from 'bad-words';
describe('bad words', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return filtered comment', async () => {
    const comment = 'This is shit';
    const result = await filterWords(comment);
    expect(result).toEqual('This is ****');
  });
  it('should throw error when failed to filter', async () => {
    const filter = new Filter();
    jest.spyOn(filter, 'clean').mockImplementation(() => {
      throw new Error('Failed to filter');
    });
    await expect(filterWords('')).rejects.toThrowError('Failed to filter');
  });
});
