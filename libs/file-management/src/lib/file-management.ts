import axios from 'axios';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 } from 'uuid';

const R2 = new S3Client({
  region: 'auto',
  endpoint: 'https://693b861e974f74c04e3709ef18e3e982.r2.cloudflarestorage.com/test' || '',
  credentials: {
    accessKeyId: '270a917dcb895a4250528286caf766f6' || '',
    secretAccessKey: '72c710c7031bdf6c4858b55ea03c7460ef91b4937c3bdd7471de5ab1d1a490b7' || '',
  },
});

export async function createSignedUrl() {
  try {
    const key = v4();
    const urls = await getSignedUrl(
      R2,
      new PutObjectCommand({
        Bucket: 'test',
        Key: key,
        ACL: 'public-read',
      }),
      { expiresIn: 3600 }
    );

    return { signedUrl: urls, accessUrl: 'https://pub-86686b615a9b4350980e59c4dd335476.r2.dev/test/' + key };
  } catch (error) {
    return { error };
  }
}

export const handleUpload = async (file: File) => {
  const data = await createSignedUrl();

  const { accessUrl, signedUrl } = data;
  await axios.put(signedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });

  return accessUrl;
};
export const fileManagement = async (fileList) => {
  if (!fileList) return;
  const accessUrls: string[] = [];

  await Promise.all(
    fileList.map(async (file) => {
      const accessUrl = await handleUpload(file);
      if (accessUrl) {
        accessUrls.push(accessUrl);
      }
    })
  );

  return accessUrls;
};
