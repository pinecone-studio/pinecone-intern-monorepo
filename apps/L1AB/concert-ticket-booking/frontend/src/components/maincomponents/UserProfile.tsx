'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../providers';
import { useUpdateUserMutation } from '@/generated';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const UserProfile = () => {
  const { signout } = useAuth();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [UpdateUser] = useUpdateUserMutation();

  const handleUpdateUser = async () => {
    await UpdateUser({
      variables: {
        input: {
          phone,
          email,
        },
      },
    });
    setPhone('');
    setEmail('');
    toast.success('Таны мэдээлэл амжилттай шинэчлэгдсэн');
  };
  return (
    <div className="w-full h-fit flex flex-col gap-6  " data-testid="userProfile">
      <p className="font-semibold text-2xl text-white">Захиалагчийн мэдээлэл</p>
      <div className="p-8 grid gap-6 text-[#FAFAFA] bg-[#131313] rounded-xl">
        <div className="grid gap-2">
          <Label htmlFor="Утасны дугаар:">Утасны дугаар:</Label>
          <Input
            type="number"
            placeholder="9900-0000"
            className="px-3 py-1 border-[#27272A] bg-[#09090B]"
            data-testid="searchinput"
            data-cy="Profile-Phone-Input"
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value.length > 8) {
                target.value = target.value.slice(0, 8);
              }
            }}
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="Имэйл хаяг:">Имэйл хаяг:</Label>
          <Input
            type="email"
            placeholder="name@example.com"
            className="px-3 py-1 border-[#27272A] bg-[#09090B]"
            data-cy="Profile-Email-Input"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="flex justify-end">
          <button
            data-testid="UpdateButton"
            className="w-fit font-medium text-sm hover:text-black hover:bg-[#00B7F4] text-white hover:border-none px-4 py-2 flex justify-center rounded-md bg-[#272729]"
            data-cy="Profile-Submit-Button"
            onClick={handleUpdateUser}
          >
            Хадгалах
          </button>
        </div>
      </div>
      <div className=" w-full flex justify-end">
        <button className="w-fit  font-medium text-sm hover:text-black hover:bg-[#00B7F4] text-white hover:border-none px-4 py-2  rounded-md bg-[#272729]" onClick={signout}>
          Гарах
        </button>
      </div>
    </div>
  );
};
