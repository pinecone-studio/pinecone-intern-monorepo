import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export const CheckingBookingLeft = () => {
  return (
    <div>
      <div className="w-[581px] h-[1487px]  p-3">
        <div>
          <h1 className="font-bold">1. Who’s checking in?</h1>
          <h1 className="text-[#71717A]">
            Please tell us the name of the guest staying at the hotel as it appears on the ID that they’ll present at check-in. If the guest has more than one last name, please enter them all.
          </h1>
        </div>
        <div className="p-3 flex flex-col gap-3">
          <h1 className="font-inter">First name</h1>
          <input type="text" className="w-full h-[36px] border rounded-xl " />
          <h1 className="text-[#71717A]">Please give us the name of one of the people staying in this room.</h1>
          <div>
            <h1>Middle Name (Optional)</h1>
            <input type="text" className="w-full h-[36px] border rounded-xl " />
          </div>
          <div>
            <h1>Last Name</h1>
            <input type="text" className="w-full h-[36px] border rounded-xl " />
          </div>
          <div className="w-full border border-[#71717A] mt-5"></div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">2. Contact information</h1>
            <h1>Email address</h1>
            <input type="text" className="w-full h-[36px] border rounded-xl " />
            <h1 className="text-[#71717A]">Your confirmation email goes here</h1>
            <div className="flex flex-col gap-2 mt-3">
              <h1>Phone Number</h1>
              <div>
                <div className="flex gap-1">
                  <Select>
                    <SelectTrigger className="w-[88px] rounded-xl">
                      <SelectValue placeholder="+976" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">+976</SelectItem>
                      <SelectItem value="dark">+113</SelectItem>
                      <SelectItem value="system">+75</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="text" className="w-[485px] h-[36px] border rounded-xl" />
                </div>
                <div className="w-full border border-[#71717A] mt-5"></div>
                <div>
                  <h1 className="font-bold">3. Reservation card detail</h1>
                  <h1 className="text-[#71717A]">Safe, secure transactions. Your personal information is protectd</h1>
                </div>
                <div className="flex justify-center mt-20">
                  <div className="w-[100px] h-[100px] border  bg-black text-white"> QR unsuulah</div>
                </div>

                <h1 className="font-bold mt-20">Important information</h1>
                <div className="flex flex-col gap-5 mt-20">
                  <h1>
                    * Guests must contact the property in advance for check-in instructions; front desk staff will greet guests on arrival. To make arrangements for check-in please contact the
                    property ahead of time using the information on the booking confirmation. If you are planning to arrive after 3:30 PM please contact the property in advance using the information
                    on the booking confirmation.
                  </h1>
                  <h1>
                    By clicking on the button below, I confirm I have read the Privacy Statement and Government Travel Advice, and have read and accept the Rules & Restrictions and Terms of Service.
                  </h1>
                </div>
                <div className="flex row justify-between mt-5">
                  <h1 className="text-white">.</h1>
                  <button className="w-[187px] h-[44px] text-white flex justify-center items-center bg-blue-600">Complete Booking</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
