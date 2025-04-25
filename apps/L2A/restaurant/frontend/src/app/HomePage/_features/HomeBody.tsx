"use client"

import { useState } from "react";
import categories from "../_components/categories.json";
import RenderFood from "../_components/RenderFoodCard";


const HomeBody = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(categories[0].id);
  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

  return (
    <div data-cy="home-page" >
      <main className="flex items-center flex-col w-[95%] mx-auto pt-10">
        <div className="text-[#441500] text-[20px] font-extralight mb-5">Хоолны цэс</div>
        
        <div data-cy="food" className="flex gap-2 mb-4">
          {categories.map((categor) => (
            <button data-cy="category-button"
              key={categor.id}
              className={`px-3 py-1 rounded ${selectedCategoryId === categor.id ? "bg-[#F4F4F5] text-black" : "bg-white"}`}
              onClick={() => setSelectedCategoryId(categor.id)}
            >
              {categor.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-around gap-4">
          {selectedCategory?.foods.map((food) => (
            <RenderFood data-cy="food" key={food.id} food={food} />
          ))}
        </div>

        <div className="backdrop-blur-sm bg-white/30 sticky bottom-0 w-[100vw] h-[84px] flex justify-center items-center">
          <div className="w-[80%] bg-[#441500] h-[36px] rounded-md text-[14px] font-semibold flex justify-center items-center text-[#FAFAFA]">
            Захиалах
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeBody;
