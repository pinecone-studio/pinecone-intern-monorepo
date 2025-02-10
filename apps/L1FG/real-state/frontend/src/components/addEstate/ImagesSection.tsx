import React, { useState } from 'react';

const ImagesSection: React.FC<{ handleChange: any }> = ({ handleChange }) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    handleChange({
      target: {
        name: 'images',
        value: updatedImages,
      },
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    handleChange({
      target: {
        name: 'images',
        value: updatedImages,
      },
    });
  };

  return (
    <div className="mt-4 mb-4 border-gray-300 rounded" data-cy="images-section">
      <div className="mt-4 mb-4 border-gray-300 rounded">
        <h2 className="text-xl font-bold mb-2">Зураг</h2>
        <p className="text-gray-700">Та үл хөдлөх хөрөнгийн зарын зурагнуудыг оруулна уу. Илүү олон зураг оруулах тусам таны зар илүү сонирхол татахуйц болно.</p>
      </div>
      <label htmlFor="images" className="block text-gray-700 font-bold mb-2"></label>
      <input id="images" type="file" multiple onChange={handleImageUpload} className="hidden" data-cy="upload-image" />
      <label htmlFor="images" className="block text-gray-700 font-bold mb-2 cursor-pointer">
        <div className="w-full p-2 border border-gray-300 rounded mb-4 text-center bg-gray-200 hover:bg-gray-300" data-cy="upload-button">
          + Зураг оруулах
        </div>
      </label>
      <div className="grid grid-cols-3 gap-4 justify-between">
        {images.map((image, index) => (
          <div key={index} className="relative w-[216px] h-[121.5px]">
            <img src={image} alt={`Uploaded ${index}`} className="w-full h-full object-cover rounded-md shadow-sm" />
            <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesSection;
