'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const ImagesSection = () => {
  const [images, setImages] = useState(Array(9).fill('/listingcard.png'));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleUpload = () => {
    setImages((prev) => [...prev, '/listingcard.png']);
  };

  return (
    <div className="bg-white rounded-xl border p-8 space-y-6 shadow-sm" data-cy="images-section">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Зураг</h3>
        <p className="text-sm text-muted-foreground">
          Please tell us the name of the guest staying at the hotel as it appears on the ID that they’ll present at check-in. If the guest has more than one last name, please enter them all.
        </p>
      </div>

      <Button
        onClick={handleUpload}
        variant="outline"
        data-cy="upload-button"
        className="w-full h-10 text-sm font-medium border border-gray-300 hover:bg-gray-50"
      >
        + Зураг оруулах
      </Button>

      <div className="grid grid-cols-3 gap-3 pt-2" data-cy="image-grid">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            data-cy={`image-card-${index}`}
            className={`relative w-full aspect-[4/3] rounded overflow-hidden border ${
              selectedIndex === index ? 'ring-2 ring-purple-500' : 'border-gray-200'
            } cursor-pointer`}
          >
            <img
              src={img}
              alt={`property-${index}`}
              className="w-full h-full object-cover"
              data-cy={`image-${index}`}
            />
            <button
              onClick={(e) => e.stopPropagation()}
              data-cy={`remove-button-${index}`}
              className="absolute top-1 right-1 bg-white text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold cursor-default"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ImagesSection;