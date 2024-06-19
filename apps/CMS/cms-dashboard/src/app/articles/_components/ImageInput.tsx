import { useState } from 'react';
import { RiImageAddFill } from 'react-icons/ri';

interface ImageInputProps {
  onImageUpload: (_file: File) => void;
}

export const ImageInput = ({ onImageUpload }: ImageInputProps) => {
  const [previewURL, setPreviewURL] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setPreviewURL(event.target?.result as string);
        onImageUpload(file);
      };
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <label htmlFor="image-input" className="tracking-light text-lg font-semibold text-[#121316] leading-6">
          Өнгөц зураг
        </label>
        <div className="max-w-[339px] bg-[#F7F7F8] h-[155px] overflow-hidden rounded-xl flex justify-center items-center relative hover:cursor-pointer">
          <input id="image-input" data-cy="image-input" name="image-input" type="file" className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handleImageChange} />
          {previewURL ? (
            <img className="rounded w-full h-full object-cover" src={previewURL} alt="uploaded img" />
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center">
              <RiImageAddFill style={{ width: '32px', height: '32px' }} />
              <p className="text-base">Зураг оруулах</p>
              <p className="text-muted text-xs">Хэмжээ: 928x427</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
