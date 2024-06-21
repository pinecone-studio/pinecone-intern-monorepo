import { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export interface InputData {
  title: string;
  topic: string;
  details: string;
}

interface LessonEntryProps {
  inputData: InputData;
  setInputData: React.Dispatch<React.SetStateAction<InputData>>;
}

export const LessonEntry: React.FC<LessonEntryProps> = ({ inputData, setInputData }) => {
  const handleInputChange = (field: keyof InputData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="flex flex-col pt-[64px] gap-[32px]">
        <div data-testid="continue topic">
          <p className="font-inter text-base font-semibold leading-5 text-[#121316] pb-[8px]">Сэдэв</p>
          <Input data-testid="lesson_input_comp" className="w-[588px] border-gray-400" placeholder="Сонгоно уу" value={inputData.topic} onChange={handleInputChange('topic')} />
        </div>
        <div data-testid="continue title">
          <p className="font-inter text-base font-semibold leading-5 text-[#121316] pb-[8px]">Гарчиг</p>
          <Input data-testid="lesson_input_sec_comp" className="w-[588px] border-gray-400" placeholder="Оруулна уу..." value={inputData.title} onChange={handleInputChange('title')} />
        </div>
        <div data-testid="continue details">
          <p className="font-inter text-base font-semibold leading-5 text-[#121316] pb-[8px]">Дэлгэрэнгүй</p>
          <Textarea
            data-testid="lesson_text_area_comp"
            className="pb-[70px] w-[588px] h-[110px] max-h-[200px] border-gray-400"
            placeholder="Энд бичнэ үү..."
            value={inputData.details}
            onChange={handleInputChange('details')}
          />
        </div>
      </div>
    </div>
  );
};
export { Input };
