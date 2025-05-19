"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import menuCategories from "@/app/admin/menu/_components/menuCategories.json";
import FoodCard from "./FoodCard";

const MenuTab = () => {
    return (
        <div data-testid="menu-tab">
            <Tabs defaultValue="menuproducts" className="w-[536px]">
                <TabsList data-testid="tabs-list">
                    <TabsTrigger data-testid="tab-products" value="menuproducts">
                        Цэсний бүтээгдэхүүн
                    </TabsTrigger>
                    <TabsTrigger data-testid="tab-manage" value="addmenu">
                        Цэс удирдах
                    </TabsTrigger>
                </TabsList>
                <TabsContent data-testid="content-products" value="menuproducts">
                    <div
                        className="flex flex-col items-center justify-center"
                        data-testid="products-container"
                    >
                        {menuCategories.map((category) =>
                            category.foods.map((food) => (
                                <FoodCard key={food.id} food={food} />
                            ))
                        )}
                    </div>
                </TabsContent>
                <TabsContent data-testid="content-manage" value="addmenu">
                    Change your password here.
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default MenuTab;
