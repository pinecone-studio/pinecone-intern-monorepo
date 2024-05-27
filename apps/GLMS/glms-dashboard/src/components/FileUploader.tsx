'use client';
import { fileManagement } from '@/file-management';
import { CancelIcon } from '../../public/assets/CancelIcon';
import { NoneImage } from '../../public/assets/NoneImage';

type FormikTypes = {
  setFieldValue: (_field: string, _value: string, _shouldValidate?: boolean) => void;
  thumbnail: string;
};
const FileUploader = (props: FormikTypes) => {
  const { setFieldValue, thumbnail } = props;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files);
      const accessUrl = await fileManagement(file, 'GLMS-dashboard');
      setFieldValue('thumbnail', accessUrl[0], true);
    }
  };

  return (
    <div
      className="w-full h-full max-h-[422px] min-h-[240px] px-2  flex justify-center items-center rounded-lg relative bg-contain bg-center bg-no-repeat dark:border-[#3d3d3def] border-dashed border-2 border-[#D6D8DB] dark:bg-[#3d3d3def]"
      data-cy="file-uploader-test-id"
      test-id="thumbnail-input"
      style={{ backgroundImage: `url(${thumbnail})` }}
    >
      {!thumbnail ? (
        <div className="w-full">
          <div className="flex justify-center w-full">
            <NoneImage />
          </div>
          <div className="flex flex-wrap justify-center">
            <p className="font-normal text-lg text-[#3F414580] dark:text-[#dedede] text-center">Зургийг чирж буулгах эсвэл</p>
            <div className="w-20 overflow-hidden relative items-center ">
              <p className="underline text-lg font-semibold text-[#3F4145] dark:text-[#dedede]">Browse</p>
              <input id="file-test" onChange={handleUpload} type="file" className="absolute top-0 left-0 opacity-0" />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="absolute top-1 right-1 cursor-pointer"
          onClick={() => {
            setFieldValue('thumbnail', '');
          }}
        >
          <CancelIcon />
        </div>
      )}
    </div>
  );
};
export default FileUploader;
