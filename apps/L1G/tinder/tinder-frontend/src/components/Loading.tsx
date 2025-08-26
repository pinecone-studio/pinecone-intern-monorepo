import { Flame } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="flex items-center mb-8">
          <Flame fill="#FD267D" color="#FD267D" size={32} className="mr-2" />
          <div className="text-3xl font-bold tracking-tight text-[#424242]">tinder</div>
        </div>

        <div className="relative mb-4">
          <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-pink-500 animate-spin"></div>
        </div>

        <p className="text-sm text-gray-400">Please Wait...</p>
      </div>

      <div className="pb-8">
        <p className="text-xs text-gray-400">©2024 Tinder</p>
      </div>
    </div>
  );
};

export default Loading;
