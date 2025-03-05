import ollama from 'ollama';

export const generateResponseStream = async (prompt: string): Promise<string> => {
  try {
    const response = await ollama.chat({
      model: 'llama3',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    // Handle the response from the Ollama model
    let result = '';
    for await (const chunk of response) {
      if (chunk?.message?.content) {
        result += chunk.message.content + ' ';
      }
    }

    return result;
  } catch (error: unknown) {
    throw new Error(`Error generating response from Ollama: ${(error as Error).message}`);
  }
};
