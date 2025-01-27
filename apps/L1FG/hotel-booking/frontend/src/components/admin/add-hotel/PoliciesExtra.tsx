export const PoliciesExtra = () => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Policies</p>
        <div className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium">Edit</div>
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7] "></div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <p className="text-[#09090B] font-Inter text-lg font-semibold">Optional extras</p>
          <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#09090B] font-Inter text-lg font-semibold">You need to know</p>
          <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#09090B] font-Inter text-lg font-semibold">We should mention</p>
          <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
        </div>
      </div>
    </div>
  );
};
