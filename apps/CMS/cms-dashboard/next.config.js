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
    ENVIRONMENT: process.env.ENVIRONMENT || '',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '*',
        pathname: '*',
      },
    ],
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  // images:{
  //   remotePatterns:[
  //     {
  //       protocol: 'https',
  //       hostname: 'getwallpapers.com',
  //       port: 'http://localhost:4200/',
  //       pathname: '/account123/**',
  //     }
  //   ]
  // }
];

module.exports = composePlugins(...plugins)(nextConfig);
