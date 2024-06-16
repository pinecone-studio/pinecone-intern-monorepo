import { useState } from 'react';
import { WhiteArrow } from '@/app/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Img } from '@/app/icons/Img';

export const LessonEntry = () => {
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const isFormValid = topic !== '' && title !== '' && details !== '';

  return (
    <div className="bg-white max-w-[1250px] w-full rounded-[12px]">
      <div className="pt-[40px] pb-[56px] px-[24px]">
        <p className="text-[#121316] text-2xl font-bold leading-9">Хичээлийн ерөнхий мэдээлэл</p>
        <div className="flex gap-[74px] h-[510px]">
          <div className="flex flex-col pt-[64px] gap-[32px]">
            <div>
              <p className="font-inter text-base font-semibold leading-5 text-[#121316] pb-[8px]">Сэдэв</p>
              <Input className="w-[588px] border-gray-400" placeholder="Сонгоно уу" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div>
              <p className="font-inter text-base font-semibold leading-5 text-[#121316] pb-[8px]">Гарчиг</p>
              <Input className="w-[588px]  border-gray-400" placeholder="Оруулна уу..." value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <p className="font-inter text-base font-semibold leading-5 text-[#121316] pb-[8px]">Дэлгэрэнгүй</p>
              <Textarea className="pb-[70px] w-[588px] h-[110px] max-h-[200px]  border-gray-400" placeholder="Энд бичнэ үү..." value={details} onChange={(e) => setDetails(e.target.value)} />
            </div>
          </div>
          <div className="pt-[64px] flex flex-col items-start">
            <p className="font-inter text-base font-semibold leading-5 text-[#121316] pb-[8px]">Хавтасны зураг</p>
            <label htmlFor="file-upload">
              <div className="w-[540px] h-[420px] border-dashed border-2 border-gray-400 flex flex-col items-center justify-center cursor-pointer rounded-[8px] gap-[15px]">
                <Img />
                <span className="text-[#D6D8DB]">Зураг сонгоно уу</span>
              </div>
            </label>
          </div>
        </div>
        <div className="flex justify-center pt-[113px]">
          <Button className={`px-[62px] py-[28px] ${isFormValid ? 'bg-[#121316]' : 'bg-gray-400'}`} disabled={!isFormValid}>
            <p className="pr-[33px] text-base font-semibold leading-6 tracking-tighter">Үргэлжлүүлэх</p>
            <WhiteArrow />
          </Button>
        </div>
      </div>
    </div>
  );
};
