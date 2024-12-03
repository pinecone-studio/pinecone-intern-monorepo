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
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
  env: {
    BACKEND_URI: process.env.BACKEND_URI ?? '',
    LOCAL_BACKEND_URI: process.env.LOCAL_BACKEND_URI ?? '',
    JWT_SECRET: process.env.JWT_SECRET,
    VERCEL_TOKEN: process.env.VERCEL_TOKEN,
    SALTROUNDS: process.env.SALTROUNDS,
    NEXT_PUBLIC_UPLOAD_PRESET: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
    NEXT_PUBLIC_CLOUDINARY_URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
