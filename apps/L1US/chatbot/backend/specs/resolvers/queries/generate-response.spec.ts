import { getResponse } from '../../../src/resolvers/queries';
import { generateResponseStream } from '../../../src/utils/connect-ollama';
import { GraphQLResolveInfo } from 'graphql';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';

jest.mock('../../../src/utils/connect-ollama', () => ({
  generateResponseStream: jest.fn(),
}));

describe('getResponse', () => {
  const mockContext = {
    req: {} as NextRequest,
  };
  it('should return the correct response for a given prompt', async () => {
    const mockStream = async function* () {
      yield 'Hello';
      yield 'World';
    };
    (generateResponseStream as jest.Mock).mockReturnValue(mockStream());

    const prompt = 'Hello, Ollama!';
    if (!getResponse) throw new Error('getResponse resolver is not defined');
    const response = await getResponse({}, { prompt } as { prompt: string }, mockContext, {} as GraphQLResolveInfo);

    expect(response).toEqual({ input: prompt, output: 'HelloWorld' });
  });
  it('should throw an error if generateResponseStream fails', async () => {
    (generateResponseStream as jest.Mock).mockRejectedValue(new Error('Error generating response from Ollama: Failed to generate response'));
    const prompt = 'Hello, Ollama!';
    if (!getResponse) throw new Error('getResponse resolver is not defined');

    await expect(getResponse({}, { prompt } as { prompt: string }, mockContext, {} as GraphQLResolveInfo)).rejects.toThrow('Error generating response from Ollama: Failed to generate response');
  });
});
