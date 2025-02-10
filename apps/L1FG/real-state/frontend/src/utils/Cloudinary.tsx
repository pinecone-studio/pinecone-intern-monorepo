export const uploadImage = async (file: File) => {
  const uploadData = new FormData();
  uploadData.append('file', file);
  uploadData.append('upload_preset', 'REAL_ESTATE_PRESET');
  uploadData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_NAME || '');
  uploadData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`, {
      method: 'POST',
      body: uploadData,
    });

    if (!response.ok) {
      throw new Error(`Хуулахад алдаа гарлаа: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const uploadImages = async (files: FileList) => {
  const uploadedImages = [];
  for (const file of Array.from(files)) {
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      uploadedImages.push(imageUrl);
    }
  }
  return uploadedImages;
};
