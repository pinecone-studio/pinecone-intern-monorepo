import { connectToDatabase } from './src/utils/database';

beforeAll(async () => {
  await connectToDatabase();
}, 5000);
