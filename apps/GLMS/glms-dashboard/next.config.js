//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  env: {
    FEDERATION_ENDPOINT: process.env.FEDERATION_ENDPOINT || '',
    ENVIRONMENT: process.env.ENVIRONMENT || '',
    ENDPOINT: process.env.ENDPOINT || '',
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID || '',
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || '',
    PUB_URL: process.env.PUB_URL || '',
  },
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'http', // Change to 'https' if necessary
        hostname: 'res.cloudinary.com',
        pathname: '/dbtqkhmu5/**', // Adjust based on your Cloudinary configuration
      },
    ],
  },
};

const plugins = [
  withNx,
  // Add any additional plugins here
];

module.exports = composePlugins(...plugins)(nextConfig);
