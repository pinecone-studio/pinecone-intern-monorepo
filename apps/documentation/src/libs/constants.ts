export const DRAWER_WIDTH = 300;

export type Section = {
  title: string;
  items: SubSection[];
};

export type SubSection = {
  title: string;
  path: string;
};

export const SECTIONS: Section[] = [
  {
    title: 'NX Monorepo',
    items: [{ title: 'Introduction', path: '/nx/introduction' }],
  },
  {
    title: 'Github Project',
    items: [{ title: 'Github project Issue', path: '/github-project-and-issue/project-issue' }],
  },
  {
    title: 'Github Repository Setup',
    items: [
      { title: 'SSH setup', path: '/github-repository-setup/ssh-setup' },
      { title: 'Github Repository Clone', path: '/github-repository-setup/repository-clone' },
      { title: 'Get Secrets', path: '/github-repository-setup/get-secrets' },
      { title: 'Run Project', path: '/github-repository-setup/run-project' },
    ],
  },
  {
    title: 'GraphQL',
    items: [
      { title: 'Introduction', path: '/graphql/introduction' },
      { title: 'Apollo Server', path: '/graphql/apollo-server' },
      { title: 'Apollo Client', path: '/graphql/apollo-client' },
      { title: 'Codegen', path: '/graphql/codegen' },
    ],
  },
  {
    title: 'Testing',
    items: [
      { title: 'Unit testing', path: '/testing/unit' },
      { title: 'E2E testing', path: '/testing/e2e' },
    ],
  },
  {
    title: 'Pull Requests',
    items: [
      { title: 'Commit Push', path: '/pull-request/commit-push' },
      { title: 'Create Pull Request', path: '/pull-request/create-pull-request' },
    ],
  },
];
