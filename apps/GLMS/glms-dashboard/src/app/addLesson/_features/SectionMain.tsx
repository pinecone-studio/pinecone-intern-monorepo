import React, { useState } from 'react';
import { CardMedia } from '@mui/material';
import { SectionEntry } from '../_components/SectionEntry';
import { SectionButton } from '../_components/SectionButton';
import { SectionSaveButt } from '../_components/SectionSaveButt';

const CLOUD_NAME = 'dbtqkhmu5';
const UPLOAD_PRESET = 'gbgzau24';

export const SectionMain = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [inputData, setInputData] = useState({
    title: '',
    description: '',
    thumbnail: '',
  });

  const handleInputChange = (field: keyof typeof inputData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputData({
      ...inputData,
      [field]: e.target.value,
    });
  };

  const fileChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      const selectedFile = event.target.files[0];
      await uploadHandler(selectedFile);
    }
  };

  const uploadHandler = async (file: File) => {
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', UPLOAD_PRESET);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
          method: 'POST',
          body: data,
        });

        const resJson = await res.json();
        console.log('Uploaded image URL:', resJson.url);

        if (resJson.url) {
          setImageUrl(resJson.url);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="relative">
          <input id="file-upload" type="file" onChange={fileChangeHandler} style={{ display: 'none' }} />
          {imageUrl && (
            <CardMedia
              component="img"
              src={imageUrl}
              style={{
                borderRadius: '8px',
                width: '580px',
                height: '230px',
                position: 'absolute',
                marginTop: '312px',
                marginLeft: '5px',
              }}
              alt="uploaded"
            />
          )}
          <SectionEntry
            inputData={inputData}
            handleInputChange={handleInputChange}
            handleFileChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </label>
      <div className="pt-[24px] flex flex-col items-center gap-[32px]">
        <SectionButton />
        <SectionSaveButt />
      </div>
    </div>
  );
};
