import { filterWords } from '@/middlewares/filter-words';

jest.mock('bad-words', () => {
  return jest.fn().mockImplementation(() => {
    return {
      clean: jest.fn((text) => text.replace(/badword/gi, '****')),
    };
  });
});

describe('filterWords', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should clean the comment by replacing bad words', async () => {
    const input = 'This is a badword comment';
    const expectedOutput = 'This is a **** comment';

    const result = await filterWords(input);

    expect(result).toBe(expectedOutput);
  });

  it('should return the original comment if there are no bad words', async () => {
    const input = 'This is a clean comment';
    const expectedOutput = 'This is a clean comment';

    const result = await filterWords(input);

    expect(result).toBe(expectedOutput);
  });

  it('should correctly handle multiple bad words', async () => {
    const input = 'This badword comment has multiple badword instances';
    const expectedOutput = 'This **** comment has multiple **** instances';

    const result = await filterWords(input);

    expect(result).toBe(expectedOutput);
  });
});
