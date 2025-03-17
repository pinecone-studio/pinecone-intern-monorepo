import ollama from 'ollama';
import { catchError } from './catch-error';

export async function askLlama(prompt: string) {
  try {
    const response = await ollama.chat({
      model: 'llama3',
      messages: [{ role: 'user', content: prompt }],
    });
    return response.message.content;
  } catch (error) {
    throw catchError(error);
  }
}
