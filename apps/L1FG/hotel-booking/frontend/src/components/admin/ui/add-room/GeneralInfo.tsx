export const GeneralInfo = () => {
  return (
    <div className="w-full border border-spacing-3 p-8 rounded-lg bg-white">
      <div className="w-[736px] flex items-center justify-between ">
        <div className=" font-Inter text-[#020617] text-lg font-semibold">General Info</div>
        <div className=" text-[#2563EB] text-base font-semibold ">Edit</div>
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
      </div>

      <div className=" text-[#71717A] flex items-center justify-between py-6 ">
        <div>
          <p>Name</p>
          <p>-/-</p>
        </div>
        <div>
          <p>Type</p>
          <p>-/-</p>
        </div>
        <div>
          <p>Price per night</p>
          <p>-/-</p>
        </div>
      </div>
      <div className=" text-[#71717A] ">
        <div>
          <p> Room Information</p>
          <p>-/-</p>
        </div>
      </div>
    </div>
  );
};
