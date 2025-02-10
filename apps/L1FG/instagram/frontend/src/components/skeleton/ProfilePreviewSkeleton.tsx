export const ProfilePreviewSkeleton = () => {
  return (
    <div className="flex flex-col w-[200px] gap-2">
      <div className="flex gap-4 w-full ">
        <div
          className="rounded-full bg-gray-200 mb-3 w-fit  p-[3px] mt-2 
         "
        >
          <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full overflow-hidden relative bg-gray-200"></div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-3 w-full">
          <p className="w-full h-[10px] bg-gray-200 rounded-sm"></p>
          <p className="w-full h-[10px] bg-gray-200 rounded-sm"></p>
        </div>
      </div>
      <div className="flex justify-around w-full h-fit grid-cols-3 gap-2">
        {Array.from({ length: 3 }, (_, i) => i).map((i) => (
          <div key={i} className="flex flex-col items-center w-full gap-2">
            <p className="font-bold w-full bg-gray-200 h-3 rounded-sm"></p>
            <p className="font-bold w-full bg-gray-200 h-3 rounded-sm"></p>
          </div>
        ))}
      </div>
      <div className="flex justify-around w-full h-fit grid-cols-3 gap-2">
        {Array.from({ length: 3 }, (_, i) => i).map((i) => (
          <div key={i} className="flex flex-col items-center w-full h-20 bg-gray-200 rounded-sm"></div>
        ))}
      </div>
    </div>
  );
};
