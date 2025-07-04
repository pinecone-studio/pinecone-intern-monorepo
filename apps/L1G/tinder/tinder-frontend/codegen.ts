import 'dotenv/config';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { existsSync } from 'fs';

const schemaPath = existsSync('apps/L1G/tinder/tinder-frontend/schema.json') ? 'apps/L1G/tinder/tinder-frontend/schema.json' : process.env.BACKEND_URI;

const config: CodegenConfig = {
  overwrite: true,
  schema: schemaPath,
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
