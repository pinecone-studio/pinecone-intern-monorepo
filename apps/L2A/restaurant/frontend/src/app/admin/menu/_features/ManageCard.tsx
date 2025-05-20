"use client";

import menuCategories from "../_components/menuCategories.json";
import { Card, CardContent } from "@/components/ui/card";
import CategoryCard from "./CategoryCard";

const ManageCard = () => {
  return (
    <div>
      <Card
        data-testid="managecard"
        className="flex flex-col justify-center w-[600px] px-2 pt-10 pb-5 mt-4 mb-10"
      >
        <p data-cy="managecard-title" className="font-semibold text-2xl ml-5">
          Цэс удирдах
        </p>
        <CardContent data-cy="managecard-content">
          <div data-cy="foodsdiv" className="flex flex-col items-between">
            {menuCategories.map((food) => (
              <CategoryCard key={food.id} food={food} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCard;
