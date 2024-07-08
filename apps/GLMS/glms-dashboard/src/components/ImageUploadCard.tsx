import { ImageDown, LoaderCircle } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadCardPropsTypes {
  label: string;
  type: string;
  imageUrl: string;
  key: string;
  dataTestid: string;
  UploadedDataTestid: string;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const ImageUploadCard = ({ label, type, onChange, imageUrl, key, dataTestid, UploadedDataTestid, isLoading }: ImageUploadCardPropsTypes) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-[16px] not-italic font-semibold leading-[20px] tracking-[-0.3px] cursor-pointer">
        {label}
      </label>
      <div className="relative w-[590px] h-[300px]" data-testid={dataTestid}>
        <input id={label} type={type} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={onChange} key={key} aria-label={label} />
        <div className="w-full h-full border-2 border-gray-300 bg-gray-50 rounded-md border-dashed flex flex-col justify-center items-center cursor-pointer" data-testid={UploadedDataTestid}>
          {isLoading ? (
            <LoaderCircle className="animate-spin text-[#64758B]" />
          ) : imageUrl ? (
            <Image src={imageUrl} alt="Uploaded" width={500} height={500} quality={100} className="w-full h-full object-cover rounded-[10px] p-1" />
          ) : (
            <>
              <ImageDown className="text-[#64758B]" />
              <p className="text-[#64758B] font-inter leading-6 tracking-[-0.3px]">
                Зургийг чирж буулгах эсвэл <span className="underline font-semibold">Browse</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
