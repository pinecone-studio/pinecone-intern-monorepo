import 'dotenv/config';
import type { CodegenConfig } from '@graphql-codegen/cli';
const schemaUrl = process.env.BACKEND_URI;

if (!schemaUrl) {
  throw new Error('BACKEND_URI is not defined in your .env file');
}

const config: CodegenConfig = {
  overwrite: true,
  schema: schemaUrl,
  documents: ['apps/L1G/tinder/tinder-frontend/src/**/*.{graphql,ts,tsx}'],
  generates: {
    'apps/L1G/tinder/tinder-frontend/src/generated/index.ts': {
      config: {
        reactApolloVersion: 3,
        withHOC: true,
        withHooks: true,
      },
      plugins: [
        {
          add: {
            content: '// @ts-nocheck',
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};
export default config;
