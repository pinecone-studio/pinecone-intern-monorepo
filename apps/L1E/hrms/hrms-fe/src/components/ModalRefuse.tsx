'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const ModalRefuse = () => {
  return (
    <div className=" flex flex-col w-[592px] h-[374px] border rounded-lg p-6 ">
      <div className="text-base font-semibold text-[#09090B]">Татгалзсан шалтгаан</div>
      <div className="text-[#71717A] text-sm font-normal mt-[6px]">Тухайн ажилтанд яагаад татгалзаж байгаагаа тайлбарлан бичнэ үү.</div>
      <Textarea placeholder="Энд бичнэ үү" className="w-[544px] h-[196px] mt-6" />
      <div className="flex flex-row gap-4 mt-6 justify-end">
        <Button className="text-[#18181B] bg-[#FFFFFF] w-[84px] h-10 border rounded-lg text-sm font-medium">Цуцлах</Button>
        <Button className="w-[80px] h-10 bg-[#18181B] text-[#FAFAFA] border rounded-lg text-sm font-medium ">Илгээх</Button>
      </div>
    </div>
  );
};
