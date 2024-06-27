import { Img } from '@/app/icons/Img';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const SectionEntry = () => {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[8px] w-[590px] ">
        <p>Хичээлийн гарчиг</p>
        <Input placeholder="Оруулна уу..." className="h-[55px]"></Input>
      </div>
      <div className=" flex flex-col gap-[8px] w-[590px]">
        <p>Дэлгэрэнгүй</p>
        <Textarea placeholder="Энд бичнэ үү..." className="h-[120px] max-h-[200px]"></Textarea>
      </div>
      <div className="flex flex-col gap-[8px]">
        <p>Хичээлийн зураг</p>
        <div className="flex flex-col items-center justify-center  gap-[8px] w-[590px] h-[240px] max-h-[200px] border-dashed border-2 rounded-[8px] ">
          <div className="flex flex-col items-center">
            <Img />
            <p>Зураг сонгоно уу </p>
          </div>
        </div>
      </div>
    </div>
  );
};
