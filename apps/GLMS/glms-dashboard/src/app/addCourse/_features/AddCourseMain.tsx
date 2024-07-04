import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PicUpload } from './PicUpload';
import { CourseEntButton } from '../_components/CourseEntButton';
import { CourseEntry } from '../_components/CourseEntry';
import { InputData } from '../_components/CourseEntry';
import { useCreateCourseMutation } from '@/generated';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const AddCourseMain: React.FC = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState('');
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
    <div className="w-[100vw] h-[100vh] bg-[#F7F7F8] flex flex-col items-center ">
      <div>
        <Button variant="ghost" onClick={navigateToHome} className="flex items-center cursor-pointer mb-[15px] mt-[30px]">
          <ArrowLeft />
          <p className="ml-[10px] text-base font-semibold">Нүүр хуудас</p>
        </Button>
        <div className="rounded-[12px] bg-white p-[24px] w-[1250px] max-w-full">
          <h2 className="text-2xl font-bold ">Сэдвийн ерөнхий мэдээлэл</h2>
          <div className="flex justify-between gap-[32px]">
            <CourseEntry inputData={inputData} handleInputChange={handleInputChange} />
            <PicUpload setImageUrl={setImageUrl} imageUrl={imageUrl} />
          </div>
          <CourseEntButton handleCreateMutation={handleCreateMutation} isFormValid={isFormValid} />
        </div>
      </div>
    </div>
  );
};
