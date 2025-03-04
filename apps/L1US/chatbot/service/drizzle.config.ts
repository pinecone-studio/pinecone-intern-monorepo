import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import { resolve } from 'path';

config({ path: resolve(__dirname, '.dev.vars') });

export default defineConfig({
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID as string,
    databaseId: process.env.DATABASE_ID as string,
    token: process.env.CLOUDFLARE_API_TOKEN as string,
  },
  verbose: true,
  schema: 'apps/L1US/chatbot/service/src/db/index.ts',
  out: 'apps/L1US/chatbot/service/drizzle',
});
