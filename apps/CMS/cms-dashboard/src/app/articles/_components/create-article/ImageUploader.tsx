'use client';
import CreateArticleIcon from '../icons/CreateArticleIcon';
import { fileManagement } from '@/file-management';

type ImageUploaderProps = {
  coverPhoto: string;
  setCoverPhoto: (_field: string, _value: string, _shouldValidate?: boolean) => void;
};

const ImageUploader = ({ coverPhoto, setCoverPhoto }: ImageUploaderProps) => {
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      const accessUrl = await fileManagement(fileList, 'CMS');
      setCoverPhoto('coverPhoto', accessUrl[0]);
    }
  };

  const Remove = () => {
    setCoverPhoto('coverPhoto', '');
  };
  return (
    <div data-testid="imageUploader" className="flex flex-col gap-4 p-6 border-b">
      <p className=" text-lg font-semibold">Өнгөц зураг</p>
      <div className="relative ">
        <label htmlFor={coverPhoto ? '' : 'input'}>
          <div className="h-[152px] flex flex-col px-[52px] py-9 justify-center items-center gap-2 rounded-xl bg-[#F7F7F8]" style={{ backgroundImage: `url(${coverPhoto})`, backgroundSize: 'cover' }}>
            {!coverPhoto && (
              <div className=" flex flex-col  justify-center items-center gap-2">
                <CreateArticleIcon />
                <p className="">Зураг оруулах</p>
                <p className="text-xs text-[#5E6166]">Хэмжээ 928x4271</p>
              </div>
            )}

            {!coverPhoto && <input onChange={handleUploadImage} id="input" type="file" accept="image/*" multiple hidden />}
          </div>
        </label>
        {coverPhoto && (
          <div className=" absolute cursor-pointer top-2 right-2  bg-red-600 rounded-full w-[15px] h-[15px] flex text-white  p-[10px] text-xs items-center justify-center " onClick={Remove}>
            X
          </div>
        )}
      </div>
    </div>
  );
};
export default ImageUploader;
