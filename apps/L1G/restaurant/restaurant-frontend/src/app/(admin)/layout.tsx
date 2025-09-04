import { ProtectedRoute } from '@/components/providers/RouteWrapper';
import Image from 'next/image';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="flex flex-col w-full h-screen bg-[#F4F4F5] items-center pb-4 overflow-hidden">
        <div className="w-full flex-shrink-0 flex flex-col py-4 px-6 gap-3 border border-[#E4E4E7] border-solid bg-white">
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

        <div className="flex-1 w-full overflow-auto flex justify-center items-start py-4">{children}</div>

        <div className="w-full flex-shrink-0 flex justify-center p-4 text-[#3F4145] text-sm">©2024 Copyright</div>
      </div>
    </ProtectedRoute>
  );
};

export default RootLayout;
