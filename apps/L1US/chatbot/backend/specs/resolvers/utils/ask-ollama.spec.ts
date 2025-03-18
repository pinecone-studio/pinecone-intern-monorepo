import ollama from 'ollama';
import { askLlama } from '../../../src/utils';

jest.mock('ollama');

describe('askLlama', () => {
  it('should throw an error if no prompt is provided', async () => {
    await expect(askLlama('')).rejects.toThrow('Prompt is required');
  });

  it('should return the correct response when ollama.chat is successful', async () => {
    const mockResponse = {
      message: { content: 'This is a test response' },
    };
    (ollama.chat as jest.Mock).mockResolvedValue(mockResponse);

    const prompt = 'Hello, Llama!';
    const response = await askLlama(prompt);

    expect(response).toBe('This is a test response');
    expect(ollama.chat).toHaveBeenCalledWith({
      model: 'llama3',
      messages: [{ role: 'user', content: prompt }],
    });
  });

  it('should throw an error if ollama.chat fails and catchError handles it correctly', async () => {
    const mockError = new Error('Handled error');
    (ollama.chat as jest.Mock).mockRejectedValue(mockError);

    await expect(askLlama('Hello, Llama!')).rejects.toThrow('Handled error');
  });

  it('should throw a generic error if an unexpected error is thrown by catchError', async () => {
    const mockUnexpectedError = 'An unexpected error occurred';
    (ollama.chat as jest.Mock).mockRejectedValue(mockUnexpectedError);

    await expect(askLlama('Hello, Llama!')).rejects.toThrow(mockUnexpectedError);
  });
});
