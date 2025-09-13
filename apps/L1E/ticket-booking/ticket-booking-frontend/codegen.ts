import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.BACKEND_URL,
  documents: ['apps/L1E/ticket-booking/ticket-booking-frontend/src/**/*.graphql'],
  generates: {
    'apps/L1E/ticket-booking/ticket-booking-frontend/src/generated/index.ts': {
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
