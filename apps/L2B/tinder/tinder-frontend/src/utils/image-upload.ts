export const imageUpload = async (file: File | null, userId: string) => {
  if (!file) {
    alert('Please select a file');
    return;
  }

  const response = await fetch(`/api/cloudinary-signature?userId=${userId}`);
  const { timestamp, signature, apiKey, cloudName, folder } = await response.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', folder);
  formData.append('upload_preset', 'tinder');

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    console.log('image upload fetch data:', data);
    return data.secure_url;
  } catch (err) {
    console.error('Upload failed:', err);
    alert('Failed to upload file');
  }
};
