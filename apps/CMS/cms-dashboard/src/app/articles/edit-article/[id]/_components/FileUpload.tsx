'use client';

import { fileManagement } from '@/file-management';
import { FileUploadIcon } from '@/icons';
import { InputLabel } from './InputLabel';

type FileUploadProps = {
  setFieldValue: (_field: string, _value: string, _shouldValidate?: boolean) => void;
  thumbnail?: string;
};

export const FileUpload = (props: FileUploadProps) => {
  const { thumbnail, setFieldValue } = props;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files);
      const accessUrl = await fileManagement(file, 'CMS-dashboard');
      setFieldValue('thumbnail', accessUrl[0], true);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-6 border-b-[1px] border-[#ECEDF0]">
      <InputLabel title="Өнгөц зураг" />

      <div className="w-full h-[190px] object-cover rounded-xl" style={{ backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover' }}>
        {!thumbnail && (
          <label className="flex flex-col gap-2 items-center w-full h-[190px] bg-[#F7F7F8] rounded-xl">
            <div className="flex flex-col pt-16 items-center gap-1">
              <FileUploadIcon />
              <p className="font-normal text-[16px] text-[#121316]">Зураг оруулах</p>
            </div>
            <input type="file" className="h-[50px] opacity-0" onChange={handleUpload} />
          </label>
        )}
      </div>
    </div>
  );
};
