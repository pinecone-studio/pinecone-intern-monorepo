const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'restaurant_foods');

  const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  const result = await res.json();

  return result.secure_url;
};
export default uploadImage;

