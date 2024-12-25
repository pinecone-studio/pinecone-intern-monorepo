'use client';

import { Button } from '@/components/ui/button';

export const ModalAccept = () => {
  return (
    <div className="w-[512px] h-[176px] border rounded-xl p-6 flex flex-col">
      <div className="text-lg font-semibold tex-[#09090B]">Та итгэлтэй байна уу?</div>
      <div className="mt-2 text-[#71717A] text-sm font-normal">Чөлөөний хүсэлтийг зөвшөөрснөөр тухайн ажилтан руу хүсэлт нь баталгаажсан гэсэн мессеж Teams Chat -аар очно.</div>
      <div className="mt-4 flex flex-row justify-end  gap-2 ">
        <Button className="w-[74px] h-[36px] bg-[#FFFFFF] text-[#18181B] border rounded-lg">Буцах</Button>
        <Button className="w-[111px] h-[36px] bg-[#18181B] text-[#FAFAFA] border rounded-lg ">Зөвшөөрөх</Button>
      </div>
    </div>
  );
};
