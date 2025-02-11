import { Categories } from '@/constants/constant';
import { SubCategoryCard } from '@/features/card/SubCategorySub';
import Link from 'next/link';

export const HomePageCategorySection = () => {
  return (
    <div className="w-full max-w-screen-xl flex flex-col items-center gap-4">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-bold">Барилгын төрлөөр</h1>
        <Link className="bg-white rounded-sm border py-2 px-4 hover:bg-gray-100" href="/estates">
          Цааш үзэх
        </Link>
      </div>

      {/* Responsive Grid Layout */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Categories.map((data) => (
          <SubCategoryCard key={data.id} title={data.value} number={data.number} value={data.value} />
        ))}
      </div>
    </div>
  );
};
