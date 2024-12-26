'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetBookingByIdQuery, useUpdateBookingEverythingMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import { useState } from 'react';
interface OrderCheckoutProps {
  id: string | string[];
}
export const OrderCheckout = ({ id }: OrderCheckoutProps) => {
  const { data } = useGetBookingByIdQuery({ variables: { id: id as string } });
  const bookingDetails = data?.getBookingById;
  const [updateBooking] = useUpdateBookingEverythingMutation();
  const router = useRouter();
  const [formData, setFormData] = useState<{
    phone: string;
    email: string;
  }>({
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
  }>({});
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{8}$/;
    if (!phone) return 'Утасны дугаар оруулна уу.';
    if (!phoneRegex.test(phone)) return 'Утасны дугаар буруу байна.';
    return '';
  };
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return 'Имэйл хаяг оруулна уу.';
    if (!emailRegex.test(email)) return 'Имэйл хаяг буруу байна.';
    return '';
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleUpdateBooking = async () => {
    const phoneValidationError = validatePhone(formData.phone);
    const emailValidationError = validateEmail(formData.email);
    setErrors({
      phone: phoneValidationError,
      email: emailValidationError,
    });
    if (!phoneValidationError && !emailValidationError) {
      await updateBooking({
        variables: {
          input: {
            _id: id as string,
            status: 'Төлбөр хүлээгдэж буй',
            phone: formData.phone,
            email: formData.email,
          },
        },
      });
    }
  };
  const getColorForVenue = (name: string | undefined): string => {
    if (name === 'Энгийн') return '#D7D7F8';
    if (name === 'Fanzone') return '#C772C4';
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
                <Label htmlFor="phone" className="font-extralight">
                  Утасны дугаар:
                </Label>
                <Input data-testid="NumberInput" id="phone" type="text" placeholder="9900-0000" value={formData.phone} onChange={handleChange} className="px-3 py-1 border-[#27272A] bg-slate-300 dark:bg-[#09090B]" />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-extralight">
                  Имэйл хаяг:
                </Label>
                <Input data-testid="Email" id="email" type="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} className="px-3 py-1 border-[#27272A]  bg-slate-300 dark:bg-[#09090B]" />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
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
                      <p> x {item?.quantity}</p>
                      <p>{item?.price && item?.quantity ? item?.price * item?.quantity : 0}₮</p>
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
            data-testid="PaymentToPush"
            className="w-full bg-[#00B7F4] hover:bg-[#6ad4f8] pt-2 px-4 text-black"
            onClick={async () => {
              await handleUpdateBooking();
              if (validateForm()) {
                router.push(`/payment/${id}`);
              }
            }}
          >
            Үргэлжлүүлэх
          </Button>
        </div>
      </div>
    </div>
  );
};
