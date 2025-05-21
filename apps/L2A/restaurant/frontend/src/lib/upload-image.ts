const parseCloudinaryUrl = (url: string | undefined) => {
  if (!url) throw new Error('CLOUDINARY_URL is missing');
  const match = url.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
  if (!match) throw new Error('Invalid CLOUDINARY_URL format');
  return match[3]; 
};
const buildFormData = (file: File, preset: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);
  return formData;
};
const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const cloudName = parseCloudinaryUrl(cloudinaryUrl);
  const uploadPreset = 'food_uploads';
  const formData = buildFormData(file, uploadPreset);
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Upload failed');
  return data.secure_url;
};
export default uploadImageToCloudinary;
