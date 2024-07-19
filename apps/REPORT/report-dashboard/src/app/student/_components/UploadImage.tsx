import { Vector } from '@/components/svg/Vector';
import { useState, ChangeEvent } from 'react';
import { toast } from 'sonner';

interface UploadImageProps {
  value: string;
  onChange: (_value: string) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ value: _value, onChange }) => {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    setUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('upload_preset', 'xnhpft2k');
    formData.append('cloud_name', 'deyylvaoy');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/deyylvaoy/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const { secure_url: secureUrl } = await res.json();
        console.log(secureUrl);

        onChange(secureUrl);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Алдаа гарлаа Дахин оролдоно уу:', error);
      toast.error('Алдаа гарлаа Дахин оролдоно уу');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-wrap">
      {!_value && (
        <label data-testid="dropzone-file" htmlFor="dropzone-file" className="flex flex-col items-center justify-center  cursor-pointer">
          {uploading ? (
            <div className="flex justify-center items-center gap-3">
              <p className="mr-1">UPLOADING...</p>
            </div>
          ) : (
            <div>
              <span className="flex gap-1">
                <Vector />
                Татах
              </span>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleUpload} />
            </div>
          )}
        </label>
      )}
    </div>
  );
};

export default UploadImage;
