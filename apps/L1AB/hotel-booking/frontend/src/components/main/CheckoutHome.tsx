import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AiOutlineThunderbolt } from 'react-icons/ai';
const CheckOutHome = () => {
  return (
    <div className="w-full p-3">
      <div className=" flex justify-center ">
        <div className="w-[1280px] h-[40px] border flex flex-row justify-between">
          <div className="flex flex-row gap-1 items-center">
            <div className="w-[20px] h-[20px] rounded-full bg-blue-600"></div>
            <h1 className="font-bold">Pedia</h1>
          </div>
          <div className="flex gap-4 flex-row">
            <h1>My Booking</h1>
            <h1>Shagai</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-3">
        <div className="w-[1280px] h-[1521px]  flex flex-row gap-5 justify-center ">
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
                        property ahead of time using the information on the booking confirmation. If you are planning to arrive after 3:30 PM please contact the property in advance using the
                        information on the booking confirmation.
                      </h1>
                      <h1>
                        By clicking on the button below, I confirm I have read the Privacy Statement and Government Travel Advice, and have read and accept the Rules & Restrictions and Terms of
                        Service.
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
          <div className="w-[515px] h-[843px]  ">
            <div className="border border-black rounded-2xl p-3 justify-center flex flex-col ">
              <div className="w-[300px] h-[200px] border bg-black text-white text-3xl rounded-xl">image!</div>
              <h1 className="font-bold text-xl mt-2">Flower Hotel Ulaanbaatar</h1>
              <h1 className="text-[#71717A] mt-3">Zaluuchuud Avenue, 18, Bayanzurkh, Ulaanbaatar, Ulaanbaatar, 001334</h1>
              <div className="flex flex-row gap-2 mt-3">
                <div className="w-[39px] h-[20px] rounded-2xl bg-blue-600 flex justify-center items-center text-white">8.6</div>
                <h1>Excellent</h1>
              </div>
              <div className="w-[483px] h-[1px] border border-[#71717A] mt-4"></div>
              <div className="flex flex-col gap-4 mt-5">
                <div>
                  <h1 className="text-[#71717A]">Check in</h1>
                  <h1>Monday, Jul 1, 3:00pm</h1>
                </div>
                <div>
                  <h1 className="text-[#71717A]">Check out</h1>
                  <h1>Tuesday, Jul 3, 11:00am</h1>
                </div>
              </div>
              <div className="w-[483px] h-[1px] border border-[#71717A] mt-5"></div>
              <div className="mt-3">
                <h1>Standard Room, City View</h1>
                <div>
                  <div className="flex flex-row gap-7 mt-3">
                    <div className="flex items-center">
                      <AiOutlineThunderbolt className="w-[26px] h-[16px]" /> 1 Queen Bed
                    </div>
                    <div className="flex items-center">
                      <AiOutlineThunderbolt className="w-[26px] h-[16px]" /> Non Smoking
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row gap-7 mt-3">
                      <div className="flex items-center">
                        <AiOutlineThunderbolt className="w-[26px] h-[16px]" /> Breakfast included
                      </div>
                      <div className="flex items-center">
                        <AiOutlineThunderbolt className="w-[26px] h-[16px]" /> Pet friendly
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[515px] h-[189px] border border-black rounded-xl mt-3 p-3">
              <h1 className="font-bold">Price Detail</h1>
              <h1 className="mt-3">1 room x 1 night</h1>
              <div className="flex flex-row justify-between">
                <h1>$78.30 per night</h1>
                <h1>USD 81.00</h1>
              </div>
              <div className="w-[483px] h-[1px] border border-[#E4E4E7] mt-3"></div>
              <div className="flex justify-between mt-3">
                <h1 className="text-2xl">Total Price</h1>
                <h1 className="text-2xl">USD 81.00</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckOutHome;
