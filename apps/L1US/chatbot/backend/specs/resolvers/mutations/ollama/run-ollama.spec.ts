import { GraphQLResolveInfo } from 'graphql';
import { runOllama } from 'apps/L1US/chatbot/backend/src/resolvers/mutations/ollama';
import { askLlama } from '../../../../src/utils';

jest.mock('../../../../src/utils', () => ({
  askLlama: jest.fn(),
}));

describe('runOllama', () => {
  const input = { prompt: 'Tell me a joke' };

  it('should throw an error if input is not provided', async () => {
    await expect(runOllama!({}, { input: undefined }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Input is required');
  });

  it('should throw an error if the prompt is missing in input', async () => {
    await expect(runOllama!({}, { input: { prompt: undefined } as any }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Prompt is required');
  });

  it('should call askLlama with the correct prompt', async () => {
    (askLlama as jest.Mock).mockResolvedValue('Joke response');

    const response = await runOllama!({}, { input }, {} as any, {} as GraphQLResolveInfo);

    expect(askLlama).toHaveBeenCalledWith(input.prompt);
    expect(response).toEqual({ response: 'Joke response' });
  });

  it('should handle errors thrown by askLlama', async () => {
    (askLlama as jest.Mock).mockRejectedValue(new Error('External API error'));

    await expect(runOllama!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('External API error');
  });

  it('should return the correct response from askLlama', async () => {
    const mockResponse = 'Here is a funny joke!';
    (askLlama as jest.Mock).mockResolvedValue(mockResponse);

    const response = await runOllama!({}, { input }, {} as any, {} as GraphQLResolveInfo);

    expect(response).toEqual({ response: mockResponse });
  });
});
