export const AboutThisProperty = () => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">About this property</p>
        <div className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium">Edit</div>
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7] "></div>
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-[#09090B] font-Inter text-sm font-normal">
          Consider a stay at Flower Hotel Ulaanbaatar and take advantage of a coffee shop/cafe, dry cleaning/laundry services, and a bar. Treat yourself to a massage at the onsite spa. Be sure to
          enjoy Mongolian cuisine at one of the 4 on-site restaurants. In addition to a gym and a business center, guests can connect to free in-room WiFi.
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-[#09090B] font-Inter text-lg font-semibold">Languages</p>
          <p className="text-[#09090B] font-Inter text-sm font-normal">English, Japanese, Mongolian, Russian</p>
        </div>
      </div>
    </div>
  );
};
