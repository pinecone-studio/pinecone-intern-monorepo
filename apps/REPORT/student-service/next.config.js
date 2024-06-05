//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: ['webpack-graphql-loader'],
    });

    return config;
  },
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    VERCEL_TOKEN: process.env.VERCEL_TOKEN || '',
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
