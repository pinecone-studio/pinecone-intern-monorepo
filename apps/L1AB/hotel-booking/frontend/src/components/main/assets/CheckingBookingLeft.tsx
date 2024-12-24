import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateBookingMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { CheckingBookingLeftType } from '../CheckoutHome';
import { Button } from '@/components/ui/button';

export const CheckingBookingLeft = ({ setFormData, formData }: CheckingBookingLeftType) => {
  const [createBooking, { loading, error }] = useCreateBookingMutation();

  const router = useRouter();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleBooking = async () => {
    const result = await createBooking({ variables: { input: formData } });
    if (result.data?.createBooking.success === true) {
      router.push('/bookings/');
    }
  };

  return (
    <div className="max-w-[581px] text-sm space-y-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="font-bold text-[20px]">1. Who’s checking in?</h1>
          <h1 className="text-[#71717A]">
            Please tell us the name of the guest staying at the hotel as it appears on the ID that they’ll present at check-in. If the guest has more than one last name, please enter them all.
          </h1>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="font-inter">First name</h1>
            <Input onChange={handleOnChange} name="firstName" type="text" className="w-full h-[36px] border rounded-xl " />
            <h1 className="text-[#71717A]">Please give us the name of one of the people staying in this room.</h1>
          </div>
          <div className="space-y-2">
            <h1>Last Name</h1>
            <Input onChange={handleOnChange} name="lastName" type="text" className="w-full h-[36px] border rounded-xl " />
          </div>
        </div>
      </div>
      <div className="w-full border border-[#E4E4E7] my-4"></div>
      <div className="space-y-4">
        <h1 className="font-bold text-[20px]">2. Contact information</h1>
        <div className="space-y-2">
          {' '}
          <h1>Email address</h1>
          <Input onChange={handleOnChange} name="email" type="text" className="w-full h-[36px] border rounded-xl " />
          <h1 className="text-[#71717A]">Your confirmation email goes here</h1>
        </div>
        <div className="space-y-2">
          <h1>Phone Number</h1>
          <div className="flex gap-2 items-center">
            <Select>
              <SelectTrigger className="w-[88px] h-9 rounded-xl">
                <SelectValue placeholder="+976" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">+976</SelectItem>
                <SelectItem value="dark">+113</SelectItem>
                <SelectItem value="system">+75</SelectItem>
              </SelectContent>
            </Select>
            <Input onChange={handleOnChange} name="phoneNumber" type="text" className="w-[485px] h-[36px] border rounded-xl" />
          </div>
        </div>
      </div>
      <div className="w-full border border-[#E4E4E7] my-4"></div>
      <div>
        <div className="space-y-2">
          {' '}
          <h1 className="font-bold text-[20px]">3. Reservation card detail</h1>
          <h1 className="text-[#71717A]">Safe, secure transactions. Your personal information is protectd</h1>
        </div>
        <div className="flex justify-center">
          <div className="w-[100px] h-[100px] border  bg-black text-white"> QR unsuulah</div>
        </div>
      </div>
      <div className="w-full border border-[#E4E4E7] my-4"></div>
      <div className="space-y-4">
        <h1 className="font-bold text-[20px]">Important information</h1>
        <div className="flex flex-col gap-5 mt-20">
          <h1>
            * Guests must contact the property in advance for check-in instructions; front desk staff will greet guests on arrival. To make arrangements for check-in please contact the property ahead
            of time using the information on the booking confirmation. If you are planning to arrive after 3:30 PM please contact the property in advance using the information on the booking
            confirmation.
          </h1>
          <h1>By clicking on the button below, I confirm I have read the Privacy Statement and Government Travel Advice, and have read and accept the Rules & Restrictions and Terms of Service.</h1>
        </div>
        <div className="flex row justify-between my-4">
          <h1 className="text-white">.</h1>
          <Button className="text-white flex justify-center items-center p-2 rounded-xl bg-blue-600" onClick={handleBooking}>
            {loading ? 'Completing Booking...' : 'Complete Booking'}
          </Button>
          {error && (
            <p className="text-red-500 text-sm" data-testid="error-message">
              {error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
