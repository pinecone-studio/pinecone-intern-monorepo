"use client"

import Image from "next/image";
import { useState } from "react";
import categories from "./_components/categories.json"

type Food = {
    id: number;
    name: string;
    price:string;
    image:string;
  };
  
  type Category = {
    id: number;
    name: string;
    foods: Food[];
  };

  const category: Category[] = categories;
  const renderFoodCard = (food: Food) => (
    <div key={food.id} className="flex flex-col">
      <div className="h-[160px] w-[160px] bg-gray overflow-hidden bg-cover">
        <Image  src={food.image}
          className="rounded-lg"
          width={160}
          height={160}
          alt={food.name} />
      </div>
      <div>{food.name}</div>
      <div className="font-bold text-[#09090B] text-[18px]">{food.price}k</div>
    </div>
  );
 

const HomePage = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(categories[0].id);
  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
    return(
        <div>
            <main className="flex items-center flex-col w-[95%] mx-auto pt-10 ">
                <div className="text-[#441500] text-[20px] font-extralight mb-5">Хоолны цэс</div>
                <div className="flex gap-2 mb-4">
        {category.map((categor) => (
          <button
            key={categor.id}
            className={`px-3 py-1 rounded ${selectedCategoryId === categor.id ? "bg-[#F4F4F5] text-black" : "bg-white"}`}
            onClick={() => setSelectedCategoryId(categor.id)}
          >
            {categor.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-around gap-4">
      {selectedCategory?.foods.map(renderFoodCard)}
      </div>
      <div className="backdrop-blur-sm bg-white/30  sticky bottom-0 w-[100vw] h-[84px] flex justify-center items-center">
        <div className="w-[80%] bg-[#441500] h-[36px] rounded-md text-[14px] font-semibold flex justify-center items-center text-[#FAFAFA] ">Захиалах</div>
      </div>
     </main>
        </div>
    )
}
export default HomePage;