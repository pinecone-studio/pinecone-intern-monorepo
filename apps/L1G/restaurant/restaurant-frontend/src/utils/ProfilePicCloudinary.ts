const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const uploadCloudinaryPicture = async (file: File) => {
  if (!file) {
    return null;
  }
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log('Uploaded image URL:', data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.log(error);
    return { error: 'failed to upload picture' };
  }
};
