export const ImageDownloader = (base64Data: string, filename = 'image.png') => {
  const link = document.createElement('a');
  link.href = base64Data;
  link.download = filename;
  link.click();
};
