export const HeaderPart = () => {
  return (
    <div className="w-full h-[96px] bg-black flex justify-between items-center py-[24px] px-[48px]">
      <div className="flex items-center gap-[8px]">
        <div className="w-[20px] h-[20px] bg-[#00B7F4] rounded-full"></div>
        <h1 className="text-white text-[24px] font-bold">TICKET BOOKING</h1>
      </div>

      <div className="flex items-center">
        <input type="search" placeholder="Хайлт" className="w-[300px] h-[40px] px-[16px] text-white bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-[#00B7F4]" />
        <button className="ml-[8px] p-[8px] text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-[16px]">
        <button className="text-white border border-gray-600 px-[16px] py-[8px] rounded-lg hover:border-white">Бүртгүүлэх</button>
        <button className="text-black bg-[#00B7F4] px-[16px] py-[8px] rounded-lg hover:bg-[#009fd1]">Нэвтрэх</button>
      </div>
    </div>
  );
};
