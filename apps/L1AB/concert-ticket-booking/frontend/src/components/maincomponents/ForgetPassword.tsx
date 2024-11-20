'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ForgetPassword = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-6 " data-cy="ForgetPasswordComponent">
      <p className="font-semibold text-2xl text-white">Захиалагчийн мэдээлэл</p>
      <div className="p-8 grid gap-6 text-[#FAFAFA] bg-[#18181B] rounded-xl">
        <div className="grid gap-2">
          <Label htmlFor="Хуучин нууц үг:">Хуучин нууц үг:</Label>
          <Input type="password" className="px-3 py-1 border-[#27272A] bg-[#09090B]" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="Шинэ нууц үг:">Шинэ нууц үг:</Label>
          <Input type="password" className="px-3 py-1 border-[#27272A] bg-[#09090B]" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="Шинэ нууц үг давтах:">Шинэ нууц үг давтах:</Label>
          <Input type="password" className="px-3 py-1 border-[#27272A] bg-[#09090B]" />
        </div>
        <div className="flex justify-end">
          <button className="w-fit font-medium text-sm hover:text-black hover:bg-[#00B7F4] text-white hover:border-none px-4 py-2 flex justify-center rounded-md bg-[#27272A]">Хадгалах</button>
        </div>
      </div>
    </div>
  );
};
