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
    LOCAL_BACKEND_URI: process.env.LOCAL_BACKEND_URI,
    BACKEND_URI: process.env.BACKEND_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
    VERCEL_TOKEN: process.env.VERCEL_TOKEN,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
