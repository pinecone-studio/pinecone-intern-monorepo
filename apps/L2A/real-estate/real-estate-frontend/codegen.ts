import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_BACKEND_URI ?? 'http://localhost:4200/graphql',
  documents: ['apps/L2A/real-estate/real-estate-frontend/src/**/*.graphql'],
  generates: {
    'apps/L2A/real-estate/real-estate-frontend/src/generated/index.ts': {
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
