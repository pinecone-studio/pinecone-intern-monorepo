import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Arrow } from '@/app/icons';
import { PicUpload } from './PicUpload';
import { LessEntButton } from '../_components/LessEntButton';
import { LessonEntry } from '../_components/LessonEntry';
import { InputData } from '../_components/LessonEntry';
import { useCreateCourseMutation } from '@/generated';

export const AddLessonMain: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();
  const [inputData, setInputData] = useState<InputData>({
    title: '',
    content: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const isValid = useCallback(() => {
    return inputData.title !== '' && inputData.content !== '' && imageUrl !== '';
  }, [inputData, imageUrl]);

  useEffect(() => {
    setIsFormValid(isValid());
  }, [isValid]);

  const handleInputChange = useCallback(
    (field: keyof InputData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputData((prev) => ({ ...prev, [field]: event.target.value }));
    },
    []
  );

  const navigateToHome = () => {
    router.push('/');
  };
  const [createCourse] = useCreateCourseMutation();

  const handleCreateMutation = async () => {
    try {
      await createCourse({
        variables: {
          createInput: {
            title: inputData.title,
            content: inputData.content,
            thumbnail: imageUrl,
          },
        },
      });
      console.log('Course created successfully!');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#F7F7F8] flex justify-center items-center">
      <div className="rounded-[12px] bg-white p-[24px] max-w-[1250px] w-full">
        <div onClick={navigateToHome} className="flex items-center cursor-pointer mb-[24px]">
          <Arrow />
          <p className="ml-[10px] text-base font-semibold">Нүүр хуудас</p>
        </div>
        <h2 className="text-2xl font-bold ">Сэдвийн ерөнхий мэдээлэл</h2>
        <div className="flex justify-between gap-[32px]">
          <LessonEntry inputData={inputData} handleInputChange={handleInputChange} />
          <PicUpload setImageUrl={setImageUrl} imageUrl={imageUrl} />
        </div>
        <LessEntButton handleCreateMutation={handleCreateMutation} isFormValid={isFormValid} />
      </div>
    </div>
  );
};
