import { useEffect, useState } from 'react';
import { Arrow } from '@/app/icons';
import { PicUpload } from './PicUpload';
import { LessEntButton } from '../_components/LessEntButton';
import { LessonEntry } from '../_components/LessonEntry';
import { useRouter } from 'next/navigation';

export const AddLessonMain = () => {
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const ToIndex = () => {
    router.push('/');
  };
  const [inputData, setInputData] = useState({
    topic: '',
    title: '',
    details: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = inputData.topic !== '' && inputData.title !== '' && inputData.details !== '';
    setIsFormValid(isValid);
  }, [inputData]);

  return (
    <div className="w-[100vw] h-[100vh] bg-[#F7F7F8] flex justify-center">
      <div>
        <div onClick={ToIndex} className="flex items-center cursor-pointer w-[145px] justify-between my-[24px]">
          <Arrow />
          <p className="p-[10px] text-base font-semibold leading-6">Нүүр хуудас</p>
        </div>
        <div className="rounded-[12px] pt-[40px] pb-[56px] px-[24px] w-[1250px] bg-white">
          <p className="text-[#121316] text-2xl font-bold leading-9">Хичээлийн ерөнхий мэдээлэл</p>
          <div className="flex justify-between">
            <LessonEntry inputData={inputData} setInputData={setInputData} />
            <PicUpload setImageUrl={setImageUrl} imageUrl={imageUrl} />
          </div>
          <LessEntButton isFormValid={isFormValid} inputData={inputData} imageUrl={imageUrl} />
        </div>
      </div>
    </div>
  );
};
