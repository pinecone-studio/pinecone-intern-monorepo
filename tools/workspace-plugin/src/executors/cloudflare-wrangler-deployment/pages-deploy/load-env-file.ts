import { config } from 'dotenv';

export const loadEnvFile = (filePath: string) => {
  const result = config({ path: filePath });
  if (result.error) {
    throw result.error;
  }

  return result.parsed;
};
