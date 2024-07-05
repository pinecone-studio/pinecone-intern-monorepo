import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export interface InputData {
  title: string;
  content: string;
}

interface LessonEntryProps {
  inputData: InputData;
  handleInputChange: (_field: keyof InputData) => (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const CourseEntry: React.FC<LessonEntryProps> = ({ inputData, handleInputChange }) => {
  return (
    <div className="flex flex-col pt-[64px] gap-[32px]">
      <div data-testid="continue title">
        <p className="font-inter text-base font-semibold leading-5 text-[#121316] pb-[8px]">Гарчиг</p>
        <Input data-testid="lesson_input_sec_comp" className="w-[588px] border-gray-400" placeholder="Оруулна уу..." defaultValue={inputData.title} onChange={handleInputChange('title')} />
      </div>
      <div data-testid="continue details">
        <p className="font-inter text-base font-semibold leading-5 text-[#121316] pb-[8px]">Дэлгэрэнгүй</p>
        <Textarea
          data-testid="lesson_text_area_comp"
          className="w-[588px] h-[110px] max-h-[200px] border-gray-400"
          placeholder="Энд бичнэ үү..."
          defaultValue={inputData.content}
          onChange={handleInputChange('content')}
        />
      </div>
    </div>
  );
};
