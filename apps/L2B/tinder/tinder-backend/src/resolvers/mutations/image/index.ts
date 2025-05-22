import { uploadImage } from './upload-image';

export default {
  Mutation: {
    ...uploadImage.Mutation,
  },
  Upload: uploadImage.Upload,
};
