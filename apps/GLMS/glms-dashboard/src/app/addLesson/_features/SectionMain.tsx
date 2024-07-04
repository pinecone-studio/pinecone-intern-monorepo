import React, { useState, useEffect } from 'react';
import { CardMedia } from '@mui/material';
import { SectionEntry } from '../_components/SectionEntry';
import { SectionButton } from '../_components/SectionButton';
import { SectionSaveButt } from '../_components/SectionSaveButt';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
// import { useCreateLessonMutation } from '@/generated';

const CLOUD_NAME = 'dbtqkhmu5';
const UPLOAD_PRESET = 'gbgzau24';

export const SectionMain = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [inputData, setInputData] = useState({
    title: '',
    content: '',
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(inputData.title.trim() && inputData.content.trim() && imageUrl));
  }, [imageUrl, inputData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  // const [createLesson] = useCreateLessonMutation();

  // const handelCreateLesson = async () => {
  //   try {
  //     await createLesson({
  //       variables: {
  //         createInput: {
  //           courseId: null,
  //           title: inputData.title,
  //           thumbnail: imageUrl,
  //           content: inputData.content
  //         }
  //       }
  //     })
  //   }
  // }

  return (
    <div className="flex flex-col items-center  bg-[#F7F7F8] w-[100% ] h-[100%]">
      <div>
        <Button variant="ghost" className="flex w-[310px] justify-between items-center mb-[15px] mt-[25px]">
          <ArrowLeft />
          <p className=" text-base font-semibold">Хичээлийн ерөнхий мэдээлэл</p>
        </Button>
        <div className="bg-white w-[1250px] h-[900px] flex flex-col items-center justify-center rounded-[12px] m-[30px]">
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
              <SectionEntry inputData={inputData} handleInputChange={handleInputChange} />
            </div>
          </label>
          <div className="pt-[24px] flex flex-col items-center gap-[32px]">
            <SectionButton />
            <SectionSaveButt disabled={disabled} />
          </div>
        </div>
      </div>
    </div>
  );
};
