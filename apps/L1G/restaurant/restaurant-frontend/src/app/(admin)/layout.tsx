import Image from 'next/image';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="w-full h-full flex flex-col py-4 px-6 gap-3 border border-[#E4E4E7] border-solid">
        <div className="flex w-full justify-between items-center">
          <Image width={32} height={32} className="w-8 h-8 rounded-full" src="/mainLogo.png" alt="Mainlogo" />
          <Image width={36} height={36} className="w-9 h-9 rounded-full" src="/userLogo.jpg" alt="Userlogo" />
        </div>
        <div className="flex gap-4">
          <a className="text-sm" href="/order">
            Захиалга
          </a>
          <a className="text-sm" href="/menu">
            Цэс
          </a>
          <a className="text-sm" href="/food">
            Хоол
          </a>
          <a className="text-sm" href="/table">
            Ширээ
          </a>
        </div>
      </div>
      <div className="flex flex-col w-full h-[100vh] bg-[#F4F4F5] items-center py-4 justify-between">
        {children}
        <div className="flex p-4 text-[#3F4145] text-sm">©2024 Copyright</div>
      </div>
    </div>
  );
};

export default RootLayout;
