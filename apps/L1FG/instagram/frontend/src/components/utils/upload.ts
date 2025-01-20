// utils/upload.ts
export const uploadImage = async (file: File): Promise<string> => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'instagram');
  data.append('cloud_name', 'dqxstnqrf');

  const res = await fetch('https://api.cloudinary.com/v1_1/dqxstnqrf/image/upload', {
    method: 'POST',
    body: data,
  });

  if (!res.ok) {
    throw new Error(`Failed to upload: ${res.statusText}`);
  }

  const uploadedImage = await res.json();
  return uploadedImage.secure_url;
};
