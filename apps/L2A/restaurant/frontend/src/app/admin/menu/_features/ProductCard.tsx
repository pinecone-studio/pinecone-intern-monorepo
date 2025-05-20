"use client";

import menuCategories from "../_components/menuCategories.json";
import { Card, CardContent } from "@/components/ui/card"
import { IoAddSharp } from "react-icons/io5";
import FoodCard from "./FoodCard";
import { useState } from "react";

const ProductCard = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(menuCategories[0].id);
    const selectedCategory = menuCategories.find((category) => category.id === selectedCategoryId);
    return (
      <div>
        <Card className="flex flex-col justify-center w-[600px] px-10 pt-10 mt-4 mb-10">
          <p className="font-semibold text-2xl">Цэс</p>
          <CardContent>
            <div data-cy="home-page">
              <div className="flex items-center flex-col mx-auto pt-5">
                <div data-cy="food" className="flex gap-2 mb-4 w-[536px] border-b-2">
                  {menuCategories.map((category) => (
                    <button
                      data-cy="category-buttons"
                      key={category.id}
                      className={`px-3 py-1 mb-1 rounded text-[14px] ${selectedCategoryId === category.id ? 'bg-[#F4F4F5] text-black' : 'bg-white'}`}
                      onClick={() => setSelectedCategoryId(category.id)}
                    >
                    {category.name}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-end w-[536px]">
                  <button className="flex items-center justify-center gap-2 w-[165px] h-[40px] text-[14px] bg-[#F4F4F5] rounded hover:bg-[#E4E4E7] border">
                    Бүтээгдэхүүн 
                    <IoAddSharp className="w-[20px] h-[20px]" />
                  </button>
                </div>
                <div data-cy="foodsdiv" className="items-center gap-5">
                  {selectedCategory?.foods.map((food) => (
                    <FoodCard key={food.id} food={food} />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
};

export default ProductCard;