import ollama from 'ollama';
import { askLlama } from '../../../src/utils';
import { catchError } from '../../../src/utils';

jest.mock('ollama');
jest.mock('../../../src/utils/catch-error', () => ({
  catchError: jest.fn(),
}));

describe('askLlama', () => {
  it('should throw an error if no prompt is provided', async () => {
    await expect(askLlama('')).rejects.toThrow('Prompt is required');
  });

  it('should return a readable stream with the correct response', async () => {
    const mockResponse = (async function* () {
      yield { message: { content: 'Hello' } };
      yield { message: { content: ', Llama!' } };
    })();
    (ollama.chat as jest.Mock).mockResolvedValue(mockResponse);

    const prompt = 'Hello, Llama!';
    const stream = await askLlama(prompt);
    const reader = stream.getReader();
    const decoder = new TextDecoder();

    let result = '';
    let done = false;
    while (!done) {
      const { done: chunkDone, value } = await reader.read();
      done = chunkDone;
      if (!done && value) {
        result += decoder.decode(value);
      }
    }

    expect(result).toBe('Hello, Llama!');
    expect(ollama.chat).toHaveBeenCalledWith({
      model: 'llama3',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });
  });

  it('should correctly handle errors and pass them to catchError', async () => {
    const mockError = new Error('Stream failed');
    (ollama.chat as jest.Mock).mockRejectedValue(mockError);

    await expect(askLlama('Hello, Llama!')).rejects.toThrow(mockError);
  });

  it('should correctly handle unexpected non-error rejections', async () => {
    const mockUnexpectedError = new Error('Unexpected failure');
    (ollama.chat as jest.Mock).mockRejectedValue(mockUnexpectedError);

    await expect(askLlama('Hello, Llama!')).rejects.toThrow(mockUnexpectedError);
  });
  it('should throw an error and call catchError if an error occurs in the stream', async () => {
    const mockError = new Error('Stream Error');

    (ollama.chat as jest.Mock).mockResolvedValue({
      [Symbol.asyncIterator]: jest.fn().mockReturnValue({
        next: jest.fn().mockRejectedValue(mockError),
      }),
    });

    try {
      await askLlama('Hello, Llama!');
    } catch (error) {
      expect(catchError).toHaveBeenCalledWith(mockError);
      expect(error).toEqual(mockError);
    }
  });
});
