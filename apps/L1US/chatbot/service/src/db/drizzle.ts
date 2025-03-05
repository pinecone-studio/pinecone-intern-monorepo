// import { getRequestContext } from '@cloudflare/next-on-pages';
// import { drizzle } from 'drizzle-orm/d1';
// import * as schema from './index.ts.template';

// export const runtime = 'edge';

// const initDbConnection = () => {
//   if (process.env.NODE_ENV === 'development') {
//     const { env } = getRequestContext();

//     return drizzle(env.DB, { schema });
//   }

//   return drizzle(process.env.DB as unknown as D1Database, { schema });
// };

// export const DB = initDbConnection();
