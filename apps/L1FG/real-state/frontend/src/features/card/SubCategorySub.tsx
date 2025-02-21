import { SubCategoryType } from '@/constants/constant';
import Image from 'next/image';
import Link from 'next/link';

export const SubCategoryCard = ({ title, number, value, image }: SubCategoryType) => {
  return (
    <Link href={`/estates?houseType=${title}`} className="relative h-full border rounded-sm overflow-hidden group ">
      <Image src={`/${image}`} alt="Background" fill className="object-cover" priority />
      <div className="w-full absolute inset-0 h-full flex items-end gap-2 p-4 backdrop-brightness-50 group-hover:backdrop-brightness-75 transition-all">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-semibold text-lg">{value}</h3>
          <p className="text-sm bg-white text-black rounded-xl px-2 py-1">{number}</p>
        </div>
      </div>
    </Link>
  );
};
