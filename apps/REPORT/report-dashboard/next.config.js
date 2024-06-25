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
  env: {
    FEDERATION_ENDPOINT: process.env.FEDERATION_ENDPOINT || '',
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID || '',
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || '',
    PUB_URL: process.env.PUB_URL || '',
    FEDERATION_ENDPOINT: process.env.FEDERATION_ENDPOINT || '',
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
