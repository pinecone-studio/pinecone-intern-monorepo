import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.LOCAL_BACKEND_URI ?? process.env.BACKEND_URI,
  documents: ['apps/L2B/hotel-booking/hotel-client/src/**/*.graphql'],
  generates: {
    'apps/L2B/hotel-booking/hotel-client/src/generated/index.ts': {
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
