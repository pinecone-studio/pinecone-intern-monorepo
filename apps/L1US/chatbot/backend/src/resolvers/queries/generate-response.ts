import { QueryResolvers } from '../../generated';
import { generateResponseStream } from '../../utils/connect-ollama';

export const getResponse: QueryResolvers['getResponse'] = async (_: unknown, { prompt }: { prompt: string }) => {
  const responseStream = await generateResponseStream(prompt);
  let response = '';
  for await (const chunk of responseStream) {
    response += chunk;
  }
  return { input: prompt, output: response };
};
