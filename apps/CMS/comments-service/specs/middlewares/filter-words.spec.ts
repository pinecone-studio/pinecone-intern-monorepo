import { filterWords } from '@/middlewares/filter-words';

jest.mock('bad-words', () => {
  return jest.fn().mockImplementation(() => {
    return {
      clean: jest.fn((text) => text.replace(/badword/g, '****')),
    };
  });
});

describe('filterWords', () => {
  it('should filter out bad words', async () => {
    const comment = 'This is a badword comment';
    const result = await filterWords(comment);
    expect(result).toBe('This is a **** comment');
  });

  it('should leave clean comments unchanged', async () => {
    const comment = 'This is a clean comment';
    const result = await filterWords(comment);
    expect(result).toBe('This is a clean comment');
  });
});
