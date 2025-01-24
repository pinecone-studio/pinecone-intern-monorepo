import Image from "next/image";
const HeroComponent = () => {
  return (
    <div className="w-[514px] h-[114px] ml-[120px]">
      <div className="border-[1px] border-[#b6c1d4] text-white w-[89px] h-[25px] rounded-2xl text-[14px] text-center">cold play </div>
      <p className="text-white font-semibold text-[42px]">MUSIC of the SPHERES</p>
      <div className="flex">
        <Image className="" src="/calendar.svg" alt="Calendar" width={24} height={24} />
        <p className="text-white mx-3">11.02</p>
        <Image src="/pipe.svg" alt="Pipe" width={24} height={24} />
        <p className="text-white mx-3">11.03</p>
        <Image src="/pipe.svg" alt="Pipe" width={24} height={24} />
        <p className="text-white mx-3">11.04</p>
      </div>
    </div>
  );
};
export default HeroComponent;
