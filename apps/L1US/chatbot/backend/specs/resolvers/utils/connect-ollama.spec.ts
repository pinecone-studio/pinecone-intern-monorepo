import { generateResponseStream } from '../../../src/utils/connect-ollama';
import ollama from 'ollama';

jest.mock('ollama', () => ({
  chat: jest.fn(),
}));

describe('generateResponseStream', () => {
  it('should generate a response successfully', async () => {
    const mockStream = async function* () {
      yield { message: { content: 'Hello' } };
      yield { message: { content: 'World' } };
    };

    (ollama.chat as jest.Mock).mockReturnValue(mockStream());
    const prompt = 'Hello, Ollama!';
    const response = await generateResponseStream(prompt);
    expect(response).toBe('Hello World ');
  });
  it('should throw an error if ollama.chat fails', async () => {
    // Mocking an error in the chat method
    (ollama.chat as jest.Mock).mockRejectedValue(new Error('Failed to generate response'));

    const prompt = 'Hello, Ollama!';

    // We expect the function to throw an error with the correct message
    await expect(generateResponseStream(prompt)).rejects.toThrow('Error generating response from Ollama: Failed to generate response');
  });

  it('should handle empty streams gracefully', async () => {
    // Mocking the stream to return no chunks
    const mockStream = async function* () {
      yield { message: { content: '' } };
    };

    (ollama.chat as jest.Mock).mockResolvedValue(mockStream());

    const prompt = 'Hello, Ollama!';
    const response = await generateResponseStream(prompt);

    expect(response).toBe(''); // Should return an empty string as no chunks are yielded
  });
});
