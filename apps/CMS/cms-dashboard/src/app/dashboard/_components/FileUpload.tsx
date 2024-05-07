import { fileManagement } from '@/file-management';
import { FileUploadIcon } from '../../../assets/icons/FileUploadIcon';

type FileUploadProps = {
  setFieldValue: (_field: string, _value: string, _shouldValidate?: boolean) => void;
  thumbnail?: string;
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
    <div className="flex flex-col gap-3">
      <p className="font-[600] text-[18px] text-[#121316]">Өнгөц зураг</p>

      <div className="w-[340px] h-[160px] object-cover rounded-xl" style={{ backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover' }}>
        {!thumbnail && (
          <label className="flex flex-col gap-2 items-center w-[340px] h-[160px] bg-[#F7F7F8] rounded-xl">
            <div className="flex flex-col pt-12 items-center gap-1">
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
