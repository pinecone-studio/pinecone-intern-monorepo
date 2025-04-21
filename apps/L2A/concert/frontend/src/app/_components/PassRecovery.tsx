export const PassRecovery = () => {
  return (
    <div className="bg-black flex justify-center">
      <div className="w-[446px] h-[254px] border-[1px]  border-[#27272A] rounded-2xl">
        <div className="text-2xl font-medium flex justify-center text-white mt-[40px]">Нууц үг сэргээх</div>
        <div className="w-[350px] h-[220px] ml-[48px]">
          <div className="text-white  mt-[24px] mb-1 ">
            <div className="flex">Имэйл хаяг:</div>
            <input placeholder="name@example.com" className="rounded-md bg-black border w-[350px] h-[36px] mt-1 pl-2 " />
          </div>
          <div className="bg-[#00B7F4] w-[350px] h-[36px] rounded-md text-black flex justify-center items-center mt-[24px] font-medium text-sm">Үргэлжлүүлэх</div>
        </div>
      </div>
    </div>
  );
};
