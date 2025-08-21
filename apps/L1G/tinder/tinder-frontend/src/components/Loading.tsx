import { Flame } from 'lucide-react';

const Loading = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex">
          <Flame fill="#FD267D" color="#FD267D" />
          <div className="text-pink-500 text-2xl font-bold animate-pulse">tinder</div>
        </div>
        <p>Please Wait...</p>
        <div className="justify-end">©2024 Tinder</div>
      </div>
    </div>
  );
};

export default Loading;
