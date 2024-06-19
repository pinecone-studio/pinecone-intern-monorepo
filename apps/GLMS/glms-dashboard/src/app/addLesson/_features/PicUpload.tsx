import { Img } from '@/app/icons/Img';
import { CardMedia } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';

const CLOUD_NAME = 'dbtqkhmu5';
const UPLOAD_PRESET = 'gbgzau24';

interface PicUploadProps {
  setImage: Dispatch<SetStateAction<string | undefined>>;
  image: string | undefined;
}

const PicUpload: React.FC<PicUploadProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      setFile(event.target.files[0]);
    }
  };

  const uploadHandler = async () => {
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: data,
      });

      const resJson = await res.json();
      console.log(resJson);

      if (resJson.url) {
        setImageUrl(resJson.url);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-[32px]">
        <div className="pt-[64px] flex flex-col items-start">
          <p className="font-inter text-base font-semibold leading-5 text-[#121316] pb-[8px]">Хавтасны зураг</p>
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="w-[540px] h-[420px] border-dashed border-2 border-gray-400 flex flex-col items-center justify-center rounded-[8px] gap-[15px]">
              <input id="file-upload" type="file" onChange={fileChangeHandler} style={{ display: 'none' }} />
              {imageUrl && <CardMedia component="img" src={imageUrl} style={{ width: '100%', height: '100%' }} alt="uploaded" />}
              {!imageUrl && <Img />}
              <div className="flex gap-[10px]">
                <span className="text-[#D6D8DB]">Зураг сонгоно уу </span>
              </div>
            </div>
          </label>
          <button type="button" onClick={uploadHandler}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export { PicUpload };
