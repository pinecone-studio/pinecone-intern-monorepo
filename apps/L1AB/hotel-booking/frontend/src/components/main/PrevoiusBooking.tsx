const PreviousBooking = () => {
  return (
    <div className="w-full p-3">
      <div className=" w-full  flex flex-row justify-between px-24">
        <div className="flex gap-2 items-center">
          <div className="w-[20px] h-[20px] bg-blue-600 rounded-full"></div>
          <h1 className="font-bold">Pedia</h1>
        </div>
        <div className="flex flex-row gap-5">
          <h1>My Booking</h1>
          <h1>Shagai</h1>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="w-[960px] h-[872px]  flex  p-3  flex-col justify-between">
          <div className="w-[896px] h-[296px] ">
            <div>
              <h1 className="text-xl font-bold">Booking</h1>
            </div>
            <div className=" items-center justify-center flex flex-col gap-4 ">
              <h1 className="text-3xl font-bold">zurag!!!!!</h1>
              <h1>Shagai, you have no upcoming trips. Where are you going next?</h1>
              <button className="w-[124px] h-[36px] rounded-xl bg-blue-600 text-white flex items-center justify-center">Start Exploring</button>
            </div>
          </div>
          <div className="w-[896px] h-[509px]  flex gap-3 flex-col">
            <div>
              <h1 className="font-bold text-xl">Previous</h1>
            </div>
            <div className="w-[896px] h-[222px]  flex flex-row border">
              <div className="w-[395px] h-[222px] border border-black bg-black text-white">image</div>
              <div className="w-[501px] h-[222px] ">
                <div className="p-3 flex flex-col gap-2">
                  <button className="w-[88px] h-[24px] rounded-xl bg-[#18BA51] flex justify-center items-center text-white ">Completed</button>
                  <h1 className="text-xl font-bold">Amar Hotel Ulaanbaatar live</h1>
                  <h1 className="text-[#71717A]">Standard Double Room, City View, 1 King Bed</h1>
                  <h1>1 night • 2 adult • 1 room</h1>
                </div>
                <div className="flex flex-col p-3">
                  <div className="flex gap-1">
                    <h1 className="text-[#71717A]">Check in: </h1>
                    <h1> Monday, Jul 1, 3:00pm</h1>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex gap-1">
                      <h1 className="text-[#71717A]">Itinerary:</h1>
                      <h1>72055771948934</h1>
                    </div>
                    <div className="flex items-center">
                      <button className="w-[100px] h-[36px] border rounded-xl flex justify-center items-center -mt-2">View Detail</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[896px] h-[222px] flex flex-row border">
              <div className="w-[395px] h-[222px] border border-black bg-black text-white">image</div>
              <div className="w-[501px] h-[222px] ">
                <div className="p-3 flex flex-col gap-2">
                  <button className="w-[88px] h-[24px] rounded-xl bg-[#E11D48] flex justify-center items-center text-white ">Cancelled</button>
                  <h1 className="text-xl font-bold">Amar Hotel Ulaanbaatar live</h1>
                  <h1 className="text-[#71717A]">Standard Double Room, City View, 1 King Bed</h1>
                  <h1>1 night • 2 adult • 1 room</h1>
                </div>
                <div className="flex flex-col p-3">
                  <div className="flex gap-1">
                    <h1 className="text-[#71717A]">Check in: </h1>
                    <h1> Monday, Jul 1, 3:00pm</h1>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex gap-1">
                      <h1 className="text-[#71717A]">Itinerary:</h1>
                      <h1>72055771948934</h1>
                    </div>
                    <div className="flex items-center">
                      <button className="w-[100px] h-[36px] border rounded-xl flex justify-center items-center -mt-2">View Detail</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PreviousBooking;
