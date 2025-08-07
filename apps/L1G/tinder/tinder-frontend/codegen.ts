import 'dotenv/config';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://tinder-backend-testing-ckjlmhd4s-nottsatsas-projects.vercel.app/api/graphql',
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
