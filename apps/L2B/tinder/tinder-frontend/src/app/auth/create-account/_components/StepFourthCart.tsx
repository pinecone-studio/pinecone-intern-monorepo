import { X } from 'lucide-react';
import Image from 'next/image';

export const StepFourthCart = ({ index, selectedImages, removeImage }: { index: number; selectedImages: string[]; removeImage: (_index: number) => void }) => {
  return (
    <div className="relative w-[197px] h-[296px] overflow-hidden rounded-md bg-gray-100">
      <Image src={selectedImages[index] || '/placeholder.svg'} alt={`Uploaded image ${index + 1}`} fill className="object-cover" data-cy="preview-image"/>
      <button onClick={() => removeImage(index)} className="absolute w-8 h-8 right-1 top-1 rounded-[10px] bg-white p-1 shadow-md">
        <X data-cy='deleteImage' className="h-4 w-4 text-gray-600 m-auto" />
      </button>
    </div>
  );
};
