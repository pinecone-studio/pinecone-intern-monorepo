'use client';
export const Header = () => {
  return (
    <div className="w-[1280px] h-[40px]  flex flex-row justify-between m-auto">
      <div className="flex flex-row gap-1 items-center">
        <div className="w-[20px] h-[20px] rounded-full bg-blue-600"></div>
        <h1 className="font-bold">Pedia</h1>
      </div>
      <div className="flex gap-4 flex-row">
        <h1>My Booking</h1>
        <h1>Shagai</h1>
      </div>
    </div>
  );
};
