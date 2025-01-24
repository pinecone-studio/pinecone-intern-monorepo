import Image from "next/image";
const Ticketreservation = () => {
  return (
    <div className="w-[385px] mx-auto mt-[100px] h-[548px] bg-[#131313] rounded-xl p-[20px] flex-col items-center">
      <div className="">
        <p className="text-[#ababab]">Тоглолт үзэх өдрөө сонгоно уу.</p>
        <Image className="my-[15px]" src="/ComboBox.svg" alt="ComboBox" width={50} height={50} />
      </div>
      <div className="w-[345px] h-[216px] my-[5px]">
        <div className="border-dashed border-b-2 border-[#27272A] "></div>
        <div className="w-[345px] h-[72px] flex items-center justify-between">
          <div className="flex items-center  justify-items-center">
            <div className="w-[10px] h-[10px] bg-[#C772C4] rounded-full mr-[10px]"></div>
            <div>
              <p className="text-[#C772C4]">Завсарын тасалбар (38)</p>
              <p className="text-white">99 000₮</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">-</div>
            <div className="text-white mx-4">0</div>
            <div className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">+</div>
          </div>
        </div>
        <div className="border-dashed border-b-2 border-[#27272A] "></div>
        <div className="w-[345px] h-[72px] flex items-center justify-between">
          <div className="flex items-center  justify-items-center">
            <div className="w-[10px] h-[10px] bg-[#D7D7F8] rounded-full mr-[10px]"></div>
            <div>
              <p className="text-[#D7D7F8]">Завсарын тасалбар (38)</p>
              <p className="text-white">99 000₮</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">-</div>
            <div className="text-white mx-4">0</div>
            <div className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">+</div>
          </div>
        </div>
        <div className="border-dashed border-b-2 border-[#27272A] "></div>
        <div className="w-[345px] h-[72px] flex items-center justify-between">
          <div className="flex items-center  justify-items-center">
            <div className="w-[10px] h-[10px] bg-[#4651C9] rounded-full mr-[10px]"></div>
            <div>
              <p className="text-[#4651C9]">Завсарын тасалбар (38)</p>
              <p className="text-white">99 000₮</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">-</div>
            <div className="text-white mx-4">0</div>
            <div className="text-white w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] flex justify-center items-center cursor-pointer">+</div>
          </div>
        </div>
      </div>
      <div className="flex-col justify-around w-[345px] h-[116px] mx-auto my-[20px]">
        <div className="flex items-center justify-between w-[345px] h-[20px] mb-[20px]">
          <p className="text-[#A1A1AA] text-[14px]">Энгийн тасалбар x 3</p>
          <p className="text-[#A1A1AA] text-[14px]">267 000₮</p>
        </div>
        <div className="flex items-center justify-between w-[345px] h-[20px] mb-[20px]">
          <p className="text-[#A1A1AA] text-[14px]">VIP тасалбар x 2</p>
          <p className="text-[#A1A1AA] text-[14px]">267 000₮</p>
        </div>
        <div className="flex items-center justify-between w-[345px] h-[20px] mb-[10px]">
          <p className="text-[#A1A1AA] text-[14px]">Нийт төлөх дүн:</p>
          <p className="text-white text-[18px] font-semibold">267 000₮</p>
        </div>
      </div>
      <button className="w-[297px] h-[36px] mx-auto rounded-lg bg-[#00B7F4] hover:bg-[#7d4dbb] flex justify-center items-center">Тасалбар авах</button>
    </div>
  );
};
export default Ticketreservation;
