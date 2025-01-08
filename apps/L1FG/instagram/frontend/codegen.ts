import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://intern-1fg-instagram-backend-testing-pinecone-studio.vercel.app/api/graphql',
  documents: ['apps/L1FG/instagram/frontend/src/**/*.graphql'],
  generates: {
    'apps/L1FG/instagram/frontend/src/generated/index.ts': {
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
