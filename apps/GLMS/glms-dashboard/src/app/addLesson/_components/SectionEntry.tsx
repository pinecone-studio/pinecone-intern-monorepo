import React from 'react';
import { Img } from '@/app/icons/Img';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const style = {
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '20px',
  letterSpacing: '-0.3px',
};

interface InputData {
  title: string;
  description: string;
  thumbnail: string;
}

interface SectionEntryProps {
  inputData: InputData;
  handleInputChange: (field: keyof InputData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SectionEntry: React.FC<SectionEntryProps> = ({ inputData, handleInputChange, handleFileChange }) => {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[8px] w-[590px]">
        <p style={style}>Хичээлийн гарчиг</p>
        <Input value={inputData.title} placeholder="Оруулна уу..." className="h-[55px]" onChange={handleInputChange('title')} />
      </div>
      <div className="flex flex-col gap-[8px] w-[590px]">
        <p style={style}>Дэлгэрэнгүй</p>
        <Textarea value={inputData.description} placeholder="Энд бичнэ үү..." className="h-[120px] max-h-[200px]" onChange={handleInputChange('description')} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <p style={style}>Хичээлийн зураг</p>
        <div className="flex flex-col items-center justify-center border-gray-400 gap-[8px] w-[590px] h-[240px] border-dashed border-2 rounded-[8px]">
          <div className="flex flex-col items-center">
            <Img />
            <p className="text-[#D6D8DB]">Зураг сонгоно уу</p>
            <input onChange={handleFileChange} />
          </div>
        </div>
      </div>
    </div>
  );
};
