'use client';

export const uploadToCloudinary = async (files: File[], userId: string): Promise<string[] | undefined> => {
  if (!files || files.length === 0) {
    alert('Please select files');
    return;
  }


const PRESET_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;
const CLOUDINARY_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;

  const uploadPromises = files.map(async (file) => {
    if (!PRESET_NAME || !CLOUDINARY_NAME) {
      alert('Cloudinary configuration is missing');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', PRESET_NAME);
    formData.append('folder', `users/${userId}`);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error('Upload failed for file:', file.name, err);
      return null;
    }
  });

  const urls = await Promise.all(uploadPromises);
  const validUrls = urls.filter((url): url is string => url !== null);

  return validUrls;
};
