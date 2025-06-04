  // eslint-disable-next-line complexity
export const uploadToCloudinary = async (files: File[], userId: string): Promise<string[] | undefined> => {

  const PRESET_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;
  const CLOUDINARY_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;


  // Disable complexity rule for this arrow function
  // eslint-disable-next-line complexity
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', PRESET_NAME!);
    formData.append('folder', `users/${userId}`);

   
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      // eslint-disable-next-line @typescript-eslint/naming-convention 
      // eslint-disable-next-line camelcase
    return data.secure_url;
  });

    

  const urls = await Promise.all(uploadPromises);
  const validUrls = urls.filter((url): url is string => url !== null && url !== undefined);

  return validUrls;
};
