export const RoomServices = () => {
  return (
    <div className="w-full border border-spacing-3 p-8 rounded-lg bg-white">
      <div className="w-[736px] flex items-center justify-between ">
        <div className=" font-Inter text-[#020617] text-lg font-semibold">Room Services</div>
        <div className=" text-[#2563EB] text-base font-semibold ">Edit</div>
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
      </div>

      <div className=" text-[#71717A] items-center justify-between py-6 ">
        <div className="flex">
          <div className="w-[356px] h-[52px]">
            <p>Bathroom</p>
            <p>-/-</p>
          </div>
          <div className="w-[356px] h-[52px]">
            <p>Accessibility</p>
            <p>-/-</p>
          </div>
        </div>
        <div className="flex pt-8">
          <div className="w-[356px] h-[52px]">
            <p>Bathroom</p>
            <p>-/-</p>
          </div>
          <div className="w-[356px] h-[52px]">
            <p>Internet</p>
            <p>-/-</p>
          </div>
        </div>
        <div className="flex pt-8">
          <div className="w-[356px] h-[52px]">
            <p>Food and drink</p>
            <p>-/-</p>
          </div>
          <div className="w-[356px] h-[52px]">
            <p>Bedroom</p>
            <p>-/-</p>
          </div>
        </div>
        <div className="pt-8">
          <p>Other</p>
          <p>-/-</p>
        </div>
      </div>
    </div>
  );
};
