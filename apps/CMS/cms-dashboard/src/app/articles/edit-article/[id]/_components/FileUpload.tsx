'use client';

import { fileManagement } from '@/file-management';
import { MdOutlineModeEdit } from 'react-icons/md';

type FileUploadProps = {
  setFieldValue: (_field: string, _value: string, _shouldValidate?: boolean) => void;
  value: string;
};

export const FileUpload = (props: FileUploadProps) => {
  const { value, setFieldValue } = props;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files);

      const accessUrl = await fileManagement(file, 'CMS-dashboard');

      setFieldValue('coverPhoto', accessUrl[0], true);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-6 border-b-[1px] border-[#ECEDF0] relative">
      <img src={`${value}`} className="w-full h-[240px] rounded-xl" />
      <div className="absolute bottom-3 left-2">
        <div className="relative">
          <div className="bg-white border-2 w-fit p-2 rounded-full">
            <MdOutlineModeEdit size={26} />
          </div>
          <input
            data-testid="file-input-test-id"
            type="file"
            className="w-[60px] border absolute top-2 opacity-0"
            onChange={(e) => {
              handleUpload(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};
