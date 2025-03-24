import ollama from 'ollama';
import { catchError } from './catch-error';

export async function askLlama(prompt: string): Promise<ReadableStream> {
  if (!prompt) {
    throw new Error('Prompt is required');
  }

  const response = await ollama.chat({
    model: 'llama3',
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });
  return new ReadableStream({
    async start(controller) {
      try {
        const encoder = new TextEncoder();
        for await (const chunk of response) {
          controller.enqueue(encoder.encode(chunk.message.content));
        }
      } catch (error) {
        controller.error(catchError(error));
      } finally {
        controller.close();
      }
    },
  });
}
