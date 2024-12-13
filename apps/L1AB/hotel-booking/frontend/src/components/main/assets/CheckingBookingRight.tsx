import { Zap } from 'lucide-react';
export const CheckingBookingRight = () => {
  return (
    <div>
      <div className="flex justify-center p-3">
        <div className="w-full p-3  flex flex-row gap-5 justify-center ">
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
                      <Zap className="w-[26px] h-[16px]" /> 1 Queen Bed
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-[26px] h-[16px]" /> Non Smoking
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row gap-7 mt-3">
                      <div className="flex items-center">
                        <Zap className="w-[26px] h-[16px]" /> Breakfast included
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-[26px] h-[16px]" /> Pet friendly
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" border border-black rounded-xl mt-3 p-3">
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
