import { fileManagement } from '@/file-management';
import { FileUploadIcon } from '@/icons';

type FileUploadProps = {
  setFieldValue: (_field: string, _value: string, _shouldValidate?: boolean) => void;
  thumbnail: string;
};

export const FileUpload = (props: FileUploadProps) => {
  const { thumbnail, setFieldValue } = props;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files);
      const accessUrl = await fileManagement(file, 'cms-dashboard');
      setFieldValue('thumbnail', accessUrl[0], true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-[600] text-[18px] text-[#121316]">Өнгөц зураг</p>

      <div className="w-[340px] h-[155px] flex flex-col gap-2 bg-[#F7F7F8] rounded-lg justify-center items-center">
        <div className="relative">
          <input type="file" className="w-[60px] opacity-1" onChange={handleUpload} />
          {/* <div className="absolute top-0 left-3">
            <FileUploadIcon />
          </div> */}
        </div>
        <p className="font-normal text-[16px] text-[#121316]">Зураг оруулах</p>
      </div>
    </div>
  );
};
