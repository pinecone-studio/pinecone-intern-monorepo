import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { v2 as cloudinary } from 'cloudinary';
import { ReadStream } from 'fs-capacitor';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = {
  Upload: GraphQLUpload,

  Mutation: {
    uploadImage: async (_: any, { file, userId }: any) => {
      console.log('Received file upload for user:', userId);

      const { createReadStream, filename } = await file;
      console.log('Filename:', filename);

      const stream: ReadStream = createReadStream();

      return new Promise((resolve, reject) => {
        const cloudStream = cloudinary.uploader.upload_stream(
          {
            folder: `user_uploads/${userId}`,
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary error:', error);
              return reject(error);
            }

            console.log('Cloudinary result:', result?.secure_url);
            resolve(result?.secure_url);
          }
        );
        stream.pipe(cloudStream);
      });
    },
  },
};
