import { useState, useRef } from 'react';
import Image from 'next/image';
import { RiImageAddFill } from 'react-icons/ri';

interface ImageInputProps {
  onImageUpload: (file: File) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({ onImageUpload }) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setPreviewURL(event.target?.result as string);
        setImage(file);
        // onImageUpload(file);
      };
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLInputElement) {
        return;
      }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <>
      <div className="flex flex-col gap-4">
        <label htmlFor="image-label" className="tracking-light text-lg font-semibold text-[#121316] leading-6">
          Өнгөц зураг
        </label>
        <div className="max-w-[339px] bg-[#F7F7F8] h-[155px] overflow-hidden rounded-xl flex justify-center items-center relative hover:cursor-pointer" onClick={handleClick}>
          <input
            ref={fileInputRef}
            id="image-input"
            name="image-input"
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewURL ? (
            <Image
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={928}
              height={427}
              className="rounded w-full h-full object-contain"
              src={previewURL}
              alt="uploaded img"
            />
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center">
              <RiImageAddFill style={{ width: '32px', height: '32px' }} />
              <p className="text-base">Зураг оруулах</p>
              <p className="text-[#5E6166] text-xs">Хэмжээ: 928x427</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

