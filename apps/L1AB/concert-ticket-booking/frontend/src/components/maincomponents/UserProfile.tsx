'use client';


import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const UserProfile = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-6 ">
      <p className="font-semibold text-2xl text-white">Захиалагчийн мэдээлэл</p>
      <div className="p-8 grid gap-6 text-[#FAFAFA] bg-[#131313] rounded-xl">
        <div className="grid gap-2">
          <Label htmlFor="Утасны дугаар:">Утасны дугаар:</Label>
          <Input
            type="number"
            placeholder="9900-0000"
            className="px-3 py-1 border-[#27272A] bg-[#09090B]"
            data-cy='Profile-Phone-Input'
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="Имэйл хаяг:">Имэйл хаяг:</Label>
          <Input type="email" placeholder="name@example.com" className="px-3 py-1 border-[#27272A] bg-[#09090B]" data-cy='Profile-Email-Input'/>
          
        </div>
        <div className="flex justify-end">
          <button className="w-fit font-medium text-sm hover:text-black hover:bg-[#00B7F4] text-white hover:border-none px-4 py-2 flex justify-center rounded-md bg-[#272729]" data-cy='Profile-Submit-Button'>Хадгалах</button>
        </div>
      </div>
    </div>
  );
};
