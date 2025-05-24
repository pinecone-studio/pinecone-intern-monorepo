import React, { useRef, useState } from 'react';

type Props = {
  name: string;
  value: string[];
  onChange: (_urls: string[]) => void;
  error?: string;
};

export const CreatePostImages = ({ name, value, onChange, error }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setUploading(true);
    const files = Array.from(e.target.files);
    for (const file of files) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'food-delivery');

      const res = await fetch('https://api.cloudinary.com/v1_1/do0qq0f0b/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      onChange([...value, result.secure_url]);
  
    }


    setUploading(false);
  };

  const removeImage = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div data-testid="image-container" className="space-y-2">
    <div className={`p-2 flex justify-center border rounded-md ${error ? 'border-red-500' : 'border-[#E4E4E7]'}`}>
      <button data-testid="upload-button" type="button" onClick={() => inputRef.current?.click()} disabled={uploading}>
        {uploading ? 'Түр хүлээнэ үү...' : '+ Зураг оруулах'}
      </button>
    </div>
    <input
      id={name}
      name={name}
      ref={inputRef}
      type="file"
      multiple
      hidden
      onChange={handleUpload}
      accept="image/*"
      data-testid="image-input"
    />

    <div className="h-3 my-2">
      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <p className="text-sm invisible">placeholder</p>
      )}
    </div>

    <div className="grid grid-cols-3 gap-4 pt-1">
      {value.map((url, idx) => (
        <div key={idx} className="relative">
          <img src={url} alt="preview" className="w-full h-36 object-cover rounded" />
          <button
            type="button"
            onClick={() => removeImage(idx)}
            className="absolute top-1 right-1 bg-[#FFFFFF] text-black px-2 rounded-md"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  </div>
  );
};
