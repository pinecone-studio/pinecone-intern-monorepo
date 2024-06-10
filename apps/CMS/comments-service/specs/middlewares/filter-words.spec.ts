import { filterWords } from '@/middlewares/filter-words';
import { BadWordModel } from '@/models/bad-word.model';
jest.mock('@/models/bad-word.model', () => ({
  BadWordModel: {
    find: jest.fn(),
  },
}));
describe('filter words funcion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const target = 'fuck that shit';
  it('should filter words and return filtered words', async () => {
    const filteredTarget = '*** that ***';
    jest.spyOn(BadWordModel, 'find').mockResolvedValueOnce([{ word: 'fuck' }, { word: 'shit' }]);
    const result = await filterWords(target);
    expect(result).toEqual(filteredTarget);
  });
  it('should return error when failed to filter', async () => {
    const errorMessage = new Error('Failed to filter words');
    try {
      await filterWords(target);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});
