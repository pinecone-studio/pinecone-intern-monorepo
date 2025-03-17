import { MutationResolvers } from '../../../generated';
import { askLlama } from '../../../utils';

export const runOllama: MutationResolvers['runOllama'] = async (_, { input }) => {
  if (!input) {
    throw new Error('Input is required');
  }
  if (!input.prompt) {
    throw new Error('Prompt is required');
  }

  const { prompt } = input;

  const response = await askLlama(prompt);
  return { response };
};
