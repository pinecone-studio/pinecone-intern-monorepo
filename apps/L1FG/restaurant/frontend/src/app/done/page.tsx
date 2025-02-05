import { Check } from 'lucide-react';
import Link from 'next/link';

const Done = () => {
  return (
    <Link href="/login">
      <div className="h-screen w-screen pt-[150px]">
        <div className="flex flex-col items-center w-full mx-auto px-4 gap-8 max-w-[340px] min-w-[320px] ">
          <div className="p-4 rounded-full bg-[#F4F4F5E5] w-[100px] h-[100px] flex justify-center items-center">
            <Check width={70} height={70} strokeWidth={1} color="#441500" />
          </div>
          <p className="text-[#441500]">Амжилттай үүсгэлээ.</p>
        </div>
      </div>
    </Link>
  );
};

export default Done;
