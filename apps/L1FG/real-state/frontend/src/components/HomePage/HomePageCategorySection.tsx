import { SubCategoryCard } from '@/features/card/SubCategorySub';
import Link from 'next/link';

type CategoryProps = {
  apartment: number | undefined;
  house: number | undefined;
  office: number | undefined;
};

export const HomePageCategorySection = ({ apartment, house, office }: CategoryProps) => {
  const Categories = [
    { id: 1, value: 'Орон сууц', title: 'Apartment', number: apartment, image: 'apartment.png' },
    { id: 2, value: 'Байшин', title: 'House', number: house, image: 'house.png' },
    { id: 3, value: 'Оффис', title: 'Office', number: office, image: 'office.jpg' },
  ];
  return (
    <div className="w-full max-w-screen-xl flex flex-col items-center gap-4">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-bold">Барилгын төрлөөр</h1>
        <Link className="bg-white rounded-sm border py-2 px-4 hover:bg-gray-100" href="/estates">
          Цааш үзэх
        </Link>
      </div>

      {/* Responsive Grid Layout */}
      <div className="w-full h-[235px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Categories.map((data) => (
          <SubCategoryCard key={data.id} image={data.image} title={data.title} number={data.number} value={data.value} />
        ))}
      </div>
    </div>
  );
};
