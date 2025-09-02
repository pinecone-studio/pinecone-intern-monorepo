import axios from 'axios';

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

export const UploadImage = async (file: File | undefined) => {
  if (!file) {
    return null;
  }
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
    const result = await response.data;
    return result.secure_url;
  } catch (error) {
    throw new Error('Зураг оруулахад алдаа гарлаа!');
  }
};
