'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetBookingByIdQuery, useUpdateBookingEverythingMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import { useState, useEffect } from 'react';

interface OrderCheckoutProps {
  id: string | string[];
}

export const OrderCheckout = ({ id }: OrderCheckoutProps) => {
  const { data } = useGetBookingByIdQuery({ variables: { id: id as string } });
  const bookingDetails = data?.getBookingById;
  const [updateBooking] = useUpdateBookingEverythingMutation();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{8}$/;
    if (!phone) return setPhoneError('Утасны дугаар оруулна уу.'), false;
    if (!phoneRegex.test(phone)) return setPhoneError('Утасны дугаар буруу байна.'), false;
    setPhoneError('');
    return true;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return setEmailError('Имэйл хаяг оруулна уу.'), false;
    if (!emailRegex.test(email)) return setEmailError('Имэйл хаяг буруу байна.'), false;
    setEmailError('');
    return true;
  };

  useEffect(() => {
    const isPhoneValid = validatePhone(phone);
    const isEmailValid = validateEmail(email);
    setIsFormValid(isPhoneValid && isEmailValid);
  }, [phone, email]);

  const handleUpdateBooking = async () => {
    await updateBooking({
      variables: {
        input: { _id: id as string, status: 'Төлбөр хүлээгдэж буй', phone, email },
      },
    });
  };
  const getColorForVenue = (name: string | undefined): string => {
    if (name === 'Энгийн') return '#D7D7F8';
    if (name === 'Fan-Zone') return '#C772C4';
    if (name === 'Vip') return '#4651C9';
    return '#D7D7F8';
  };
  return (
    <div className="h-[48rem] max-sm:h-full max-md:h-full max-lg:h-full">
      <nav className="flex items-center justify-between border-b-[2px] dark:border-[#27272A] border-[#c6c6c6] py-8 px-12 max-sm:px-3 max-sm:justify-evenly max-md:px-3 max-md:justify-evenly max-lg:px-3 max-lg:justify-evenly">
        <Button className="bg-[#1F1F1F]  h-10 w-10 text-white" data-testid="BacktoPush" onClick={() => router.push(`/bookTicket/${bookingDetails?.eventId._id}`)}>
          <FaArrowLeft />
        </Button>
        <p className="text-2xl font-semibold dark:text-white text-black max-sm:text-xl">Захиалга баталгаажуулах</p>
        <p></p>
      </nav>
      <div className="flex gap-8 px-28 py-[60px] max-sm:px-0 max-sm:grid max-sm:gap-8 max-md:px-3 max-md:grid max-md:gap-8 max-lg:grid max-lg:gap-8">
        <div className="flex-1 dark:bg-[#131313] bg-[#f2f2f2] p-8 rounded-md">
          <div className="w-full h-fit flex flex-col gap-6">
            <p className="font-bold text-2xl dark:text-white text-black">Захиалагчийн мэдээлэл</p>
            <div className="p-8 grid gap-6 dark:text-[#FAFAFA] text-black rounded-xl">
              <div className="grid gap-2">
                <Label htmlFor="Утасны дугаар:" className="font-extralight">
                  Утасны дугаар:
                </Label>
                <Input
                  type="string"
                  placeholder="9900-0000"
                  data-testid="NumberInput"
                  className="px-3 py-1 dark:border-[#27272A] dark:bg-[#09090B]  border-[#c6c6c6] bg-white"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={8}
                />
                {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Имэйл хаяг:" className="font-extralight">
                  Имэйл хаяг:
                </Label>
                <Input
                  type="email"
                  data-testid="EmailInput"
                  placeholder="name@example.com"
                  className="px-3 py-1 dark:border-[#27272A] dark:bg-[#09090B]  border-[#c6c6c6] bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[392px] dark:bg-[#131313] bg-[#f2f2f2] p-6 rounded-md max-md:w-full max-lg:w-full">
          <div className="flex gap-8">
            <p className="font-extralight dark:text-white text-black opacity-50 w-full">Бүтээгдэхүүний тоо</p>
            <p className="dark:text-white text-black font-semibold">{bookingDetails?.venues?.reduce((acc, item) => acc + (item?.quantity || 0), 0)}</p>
          </div>
          <div>
            {bookingDetails?.venues?.map((item, index) => {
              const color = getColorForVenue(item?.name ?? undefined);
              return (
                <div key={index} className="flex items-center py-4 justify-between gap-2 border-b-[2px] border-dashed dark:border-[#27272A] border-[#c6c6c6]">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <GoDotFill className="w-8 h-8" style={{ color }} />
                      <p className="text-[12px]" style={{ color }}>
                        {item?.name}
                      </p>
                    </div>
                    <div className="flex gap-2 dark:text-white text-black opacity-50">
                      <p className="text-[16px] ">{item?.price}₮</p>
                      <p > x {item?.quantity}</p>
                      <p >{item?.price && item?.quantity ? item?.price * item?.quantity : 0}₮</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center py-4">
            <p className="dark:text-[#A1A1AA] text-black">Нийт төлөх дүн:</p>
            <p className="dark:text-white text-black text-xl font-semibold">{bookingDetails?.amountTotal}₮</p>
          </div>
          <Button
            className="w-full bg-[#00B7F4] hover:bg-[#6ad4f8] pt-2 px-4 text-black"
            data-testid="PaymentToPush"
            onClick={() => {
              handleUpdateBooking();
              router.push(`/payment/${id}`);
            }}
            disabled={!isFormValid}
          >
            Үргэлжлүүлэх
          </Button>
        </div>
      </div>
    </div>
  );
};
