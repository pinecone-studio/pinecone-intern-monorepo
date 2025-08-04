import 'dotenv/config';
import type { CodegenConfig } from '@graphql-codegen/cli';

const rawUri = process.env.BACKEND_URI;
if (!rawUri) {
  throw new Error('BACKEND_URI is not defined in the environment.');
}
const sanitizedUri = rawUri.replace(/:$/, '');

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [sanitizedUri]: {
        headers: {
          'x-apollo-operation-name': 'IntrospectionQuery',
        },
      },
    },
  ],
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
