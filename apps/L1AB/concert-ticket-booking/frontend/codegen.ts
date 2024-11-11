import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.BACKEND_URI ?? 'http://localhost:4200/api/graphql',
  documents: ['apps/L1AB/concert-ticket-booking/frontend/src/**/*.graphql'],
  generates: {
    'apps/L1AB/concert-ticket-booking/frontend/src/generated/index.ts': {
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
