'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import MenuCard from './MenuCard';
import { useGetCategoriesQuery, useGetFoodsQuery } from '@/generated';
import OrderList from './OrderList';
import { count } from 'console';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
const menuItems = [
  {
    id: 1,
    name: 'Taco',
    price: '15.6к',
    image: 'https://img1.wsimg.com/isteam/ip/0d953ba0-4d92-4d01-8e07-da1813873883/Sweetish%20meatballs%20pic.jpg',
    category: 'main',
  },
  {
    id: 2,
    name: 'Taco',
    price: '15.6к',
    image: 'https://www.tasteofhome.com/wp-content/uploads/2025/01/German-Meatballs_EXPS_TOHD24_4166_SarahTramonte_4.jpg?w=700',
    category: 'main',
  },
  {
    id: 3,
    name: 'Кофе, цай',
    price: '15.6к',
    image:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.616.462.85.suffix/1465939620872.webp',
    category: 'coffee',
  },
  {
    id: 4,
    name: 'Кофе, цай',
    price: '15.6к',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3lHi-tUwsg1u2vM222H8Q8g35GY9IM-AAz3KJlnU6l0LuXkIb_jVCZosjKZPlDpkz74M&usqp=CAU',
    category: 'coffee',
  },
  {
    id: 5,
    name: 'Салат',
    price: '15.6к',
    image:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.616.462.85.suffix/1465939620872.webp',
    category: 'main',
  },
  {
    id: 6,
    name: 'Taco',
    price: '15.6к',
    image:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.616.462.85.suffix/1465939620872.webp',
    category: 'main',
  },
];

const HomePageContainer = () => {
  const { data: foodsData } = useGetFoodsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [activeCategory, setActiveCategory] = useState('Үндсэн хоол');
  const filteredItems = (foodsData?.getFoods ?? []).filter((item): item is NonNullable<typeof item> => item?.category?.categoryName === activeCategory);
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-4 py-6 text-center border-b">
        <h1 className="text-2xl font-bold text-gray-800">Хоолны цэс</h1>
      </div>
      <div className="bg-white px-4 py-4 border-b">
        <div className="flex space-x-6 overflow-x-auto">
          {categoriesData?.getCategories.map((category) => (
            <button
              data-testid="homepage-container-filter-button"
              key={category?.categoryId}
              onClick={() => {
                if (category?.categoryName) {
                  setActiveCategory(category.categoryName);
                }
              }}
              className={`whitespace-nowrap text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeCategory === category?.categoryName ? 'text-orange-600 border-orange-600' : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              {category?.categoryName}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {filteredItems.map((value) => (
            <MenuCard key={value?.foodId} image={value.image} foodName={value.foodName} price={value.price} />
          ))}
        </div>
      </div>

      <div>
        {isSelected && (
          <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
              <div className="w-full h-[375px] bg-white px-4 py-4 rounded-t-xl overflow-scroll fixed bottom-[87px]">
                <div className="w-full h-[36px] flex justify-center items-center">
                  <p>Таны захиалга</p>
                </div>
                <div className="flex flex-col gap-4 pb-[100px]">
                  {menuItems.map((value) => (
                    <OrderList image={value.image} price={value.price} count={1} foodName={value.name} />
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
        <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center w-full h-[85px] bg-white border-t ">
          <Button className=" w-full h-[36px] bg-amber-800 hover:bg-amber-900 text-white py-4 text-lg font-medium rounded-lg ">Захиалах</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePageContainer;
