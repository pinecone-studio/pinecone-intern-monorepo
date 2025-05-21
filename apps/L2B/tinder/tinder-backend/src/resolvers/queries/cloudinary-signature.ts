import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  CLOUDINARY_NAME: 'dagcnqvlx',
  API_KEY: '268832677671422',
  API_SECRET: 'J6-Qm4W-LKKWQO6vv-7LSSHI_Hk',
});

export const getUploadSignature = async (userId: string) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = `users/${userId}`;

  const signature = cloudinary.utils.api_sign_request({ timestamp, folder, PRESET_NAME: 'tinder' }, cloudinary.config().api_secret!);

  return {
    timestamp,
    signature,
    folder,
    apiKey: cloudinary.config().API_KEY,
    cloudName: cloudinary.config().CLOUDINARY_NAME,
  };
};
