'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateUserMutation } from '@/generated';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const UserProfile = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ phone: '', email: '' });

  const [UpdateUser] = useUpdateUserMutation();

  const validateForm = () => {
    const errors: { phone: string; email: string } = { phone: '', email: '' };

    if (!phone) {
      errors.phone = 'Утасны дугаар оруулна уу!';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Имэйл хаяг оруулна уу!';
    }

    setErrors(errors);

    return !errors.phone && !errors.email;
  };

  const handleUpdateUser = async () => {
    if (!validateForm()) {
      return;
    }

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
    toast.success('Таны мэдээлэл амжилттай шинэчлэгдсэн', { autoClose: 1500 });
  };

  return (
    <div className="w-full h-fit flex flex-col gap-6  " data-testid="userProfile">
      <p className="font-semibold text-2xl dark:text-white text-black">Захиалагчийн мэдээлэл</p>
      <div className="p-8 grid gap-6 dark:text-[#FAFAFA] text-black dark:bg-[#131313] bg-[#f2f2f2] rounded-xl">
        <div className="grid gap-2">
          <Label htmlFor="phone">Утасны дугаар:</Label>
          <Input
            id="phone"
            type="number"
            placeholder="9900-0000"
            className="px-3 py-1 dark:border-[#27272A] dark:bg-[#09090B] border-[#c6c6c6] bg-white"
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
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Имэйл хаяг:</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="px-3 py-1 dark:border-[#27272A] dark:bg-[#09090B] border-[#c6c6c6] bg-white"
            data-cy="Profile-Email-Input"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
    </div>
  );
};
