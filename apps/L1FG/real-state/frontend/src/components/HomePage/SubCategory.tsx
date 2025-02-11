import { SubCategory } from '@/constants/constant';
import { SubCategoryCard } from '@/features/card/SubCategorySub';

export const HomePageSubCategorySection = () => {
  return (
    <div className="w-full h-[175px] max-w-screen-xl grid grid-cols-4 gap-4 justify-between">
      {SubCategory.map((data) => {
        return <SubCategoryCard key={`${data.id}+${data.value}`} value={data.value} title={data.title} number={data.number} />;
      })}
    </div>
  );
};
