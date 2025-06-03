'use client';

import { Button } from '@/components/ui/button';
import { useFormikContext } from 'formik';
import Image from 'next/image';

const ImagesSection = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  const images: string[] = values.images || [];

  const handleUpload = () => {
    const newImages = [...images, '/listingcard.png']; 
    setFieldValue('images', newImages);
  };

  const handleSelect = (index: number) => {
    setFieldValue('selectedImageIndex', index);
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setFieldValue('images', updated);
    setFieldValue('selectedImageIndex', null);
  };

  const selectedIndex = values.selectedImageIndex;

  return (
    <div
      className="bg-white rounded-xl border p-8 space-y-6 shadow-sm"
      data-testid="images-section"
    >
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Зураг</h3>
        <p className="text-sm text-muted-foreground">
          Please upload property images. Click to select one, or remove unwanted images.
        </p>
      </div>

      <Button
        onClick={handleUpload}
        variant="outline"
        data-testid="upload-button"
        className="w-full h-10 text-sm font-medium border border-gray-300 hover:bg-gray-50"
      >
        + Зураг оруулах
      </Button>

      <div className="grid grid-cols-3 gap-3 pt-2" data-testid="image-grid">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => handleSelect(index)}
            data-testid={`image-card-${index}`}
            className={`relative w-full aspect-[4/3] rounded overflow-hidden border ${
              selectedIndex === index ? 'ring-2 ring-purple-500' : 'border-gray-200'
            } cursor-pointer`}
          >
            <Image
              src={img}
              width={400}
              height={300}
              alt={`property-${index}`}
              className="w-full h-full object-cover"
              data-testid={`image-${index}`}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(index);
              }}
              data-testid={`remove-button-${index}`}
              className="absolute top-1 right-1 bg-white text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesSection;
