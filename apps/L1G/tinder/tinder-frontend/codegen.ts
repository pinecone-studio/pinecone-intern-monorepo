import 'dotenv/config';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { existsSync } from 'fs';

const useLocalSchema = existsSync('apps/L1G/tinder/tinder-frontend/schema.json');

const config: CodegenConfig = {
  overwrite: true,
  schema: useLocalSchema ? 'apps/L1G/tinder/tinder-frontend/schema.json' : process.env.BACKEND_URI,
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
