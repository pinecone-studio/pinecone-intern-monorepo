import Image from 'next/image';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white w-screen text-gray-600">
      <Image src={'/tinder.svg'} alt="" width={100} height={100} />
      <div className="relative w-10 h-10 mb-3 mt-3">
        <div className="absolute inset-0 rounded-full border-4 border-red-200 opacity-50"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-red-500 animate-spin"></div>
      </div>
      <p className="text-sm">Please Wait...</p>
      <footer className="absolute bottom-4 text-xs text-gray-400">©2024 Tinder</footer>
    </div>
  );
};
export default Loading;
