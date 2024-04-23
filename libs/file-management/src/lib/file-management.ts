import axios from 'axios';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 } from 'uuid';

const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export const createSignedUrl = async (folder: string) => {
  try {
    const key = v4();
    const urls = await getSignedUrl(
      R2,
      new PutObjectCommand({
        Bucket: 'file-management',
        Key: `${folder}/` + `${key}`,
        ACL: 'public-read',
      }),
      { expiresIn: 3600 }
    );

    return { signedUrl: urls, accessUrl: process.env.PUB_URL + `${folder}/` + key };
  } catch (error) {
    throw new Error('No signed or access url');
  }
};
export const handleUpload = async (file: File, folder: string) => {
  const data = await createSignedUrl(folder);

  const { accessUrl, signedUrl } = data;
  await axios.put(signedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
  return accessUrl;
};

export const fileManagement = async (fileList: any, folder: string) => {
  const accessUrls: string[] = [];

  await Promise.all(
    fileList.map(async (file: File) => {
      const accessUrl = await handleUpload(file, folder);
      if (accessUrl) {
        accessUrls.push(accessUrl);
      }
    })
  );

  return accessUrls;
};
