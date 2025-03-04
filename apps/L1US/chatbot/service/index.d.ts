/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module '@cloudflare/next-on-pages' {
  // Replace with actual types based on the library documentation or usage
  export function getRequestContext(): {
    env: {
      DB: D1Database;
    };
  };
}
