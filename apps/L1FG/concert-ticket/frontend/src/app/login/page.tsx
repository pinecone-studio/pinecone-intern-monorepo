import Link from 'next/link';
const Page = () => {
  return (
    <div className="Container w-[1334px] mx-auto ">
      <div className="w-[446px] mx-auto h-[420px] mt-[400px] bg-[#09090B] border-2 border-[#27272A] rounded-md">
        <p className="text-white mx-auto my-[20px] text-[24px] font-semibold w-[89px] h-[48px]">Нэвтэрч</p>
        <div className="mx-auto w-[350px] h-[220px]">
          <div className="my-[10px">
            <p className="text-[#FAFAFA]">Имэйл хаяг:</p>
            <input
              className="bg-black text-[13px] texted-[#A1A1AA] pl-[10px] border-[#27272A] text-white w-[350px] h-[36px] my-[10px] border-2 rounded-sm "
              type="texted"
              placeholder="Нэр@жишээ.com"
            />
          </div>
          <div className="my-[10px]">
            <p className="text-[#FAFAFA]">Нууц үг:</p>
            <input className="bg-black text-[13px] w-[350px] text-[white] pl-[10px] h-[36px] border-[#27272A] my-[10px] border-2 rounded-sm" type="texted" placeholder="Нууц үг" />
          </div>
          <button className="w-[350px] h-[36px] bg-[#00B7F4] rounded-sm">Нэвтрэх</button>
        </div>
        <div className="text-[#A1A1AA] text-[14px] mx-auto w-[350px] mt-[15px] h-[40px] flex-col text-center ">
          Та бүртгэлтэй хаяггүй бол
          <Link href={'/sign-up'}>
            <button className="bg-transparent underline px-[4px]">бүртгүүлэх</button>
          </Link>
          хэсгээр орно уу.
        </div>
      </div>
    </div>
  );
};
export default Page;
