export const BookingCard = () => {
  return (
    <div className=" flex gap-3 flex-col">
      <div>
        <h1 className="font-bold text-xl">Previous</h1>
      </div>
      <div className=" flex flex-row border rounded-xl">
        <div className="w-[395px] h-[222px] border border-black bg-black text-white rounded-xl">image</div>
        <div className="p-3 w-full ">
          <div className="p-3 flex flex-col gap-2">
            <button className="w-[88px] h-[24px] rounded-xl bg-[#18BA51] flex justify-center items-center text-white text-sm">Completed</button>
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
                <button className="w-[100px] h-[36px] border rounded-xl flex justify-center items-center -mt-2 text-sm">View Detail</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
