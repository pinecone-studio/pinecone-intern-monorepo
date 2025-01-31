import Image from 'next/image';

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image width={100} height={100} src={'/BigCorrect.svg'} alt="BigCorrect" />
      <div className="p-8 w-full max-w-3xl">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-white text-center text-xl mb-2">Захиалга амжилттай</div>
          <div className="text-gray-400 text-center">
            Таны имэйл хаяг руу <span className="text-blue-500">#12374</span> тасалбар амжилттай илгээгдлээ
          </div>
        </div>
      </div>
    </div>
  );
};
export default Success;
