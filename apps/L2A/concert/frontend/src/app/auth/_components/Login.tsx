'use client';

export const Login = () => {
  return (
    <div data-cy="signin-form" className="bg-black flex justify-center h-[100vh] w-[100%]">
      <div className="w-[446px] h-[420px] border-[1px]  border-[#27272A] rounded-2xl mt-[190px]">
        <div className="text-2xl font-rounded flex justify-center text-white mt-[40px]">Нэвтрэх</div>
        <div className="w-[350px] h-[220px] ml-[48px]">
          <div className="text-white  mt-[24px] mb-1 ">
            <div className="flex">Имэйл хаяг:</div>
            <input placeholder="name@example.com" className="rounded-md bg-black border w-[350px] h-[36px] mt-1 pl-2 " />
          </div>
          <div className="text-white mt-[25px] ">
            Нууц үг:
            <input className="rounded-md bg-black border w-[350px] h-[36px] mt-2 pl-2" />
          </div>
          <div className="bg-[#00B7F4] w-[350px] h-[36px] rounded-md text-black flex justify-center items-center mt-[24px] text-sm">Нэвтрэх</div>
          <div className="text-[#A1A1AA] mt-[25px] text-sm flex">
            Та бүртгэлтэй хаяггүй бол
            <div className="underline ml-1 mr-1">бүртгүүлэх</div>
            <p className="">
              хэсгээр <br /> орно уу.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
