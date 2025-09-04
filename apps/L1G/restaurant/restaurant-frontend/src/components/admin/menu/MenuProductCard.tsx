'use client';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Category, Discount, Food, useGetCategoriesQuery, useGetDiscountsQuery, useGetFoodsQuery } from '@/generated';
import { useEffect, useState } from 'react';
import { CategoryFoodsCard, DiscountFoodsCard, FoodAddDialog } from '@/components/admin';

export const MenuProductCard = () => {
  const [activeMenu, setActiveMenu] = useState<string | undefined>(undefined);
  const [activeMenuType, setActiveMenuType] = useState<'category' | 'discount'>('category');

  const { data: categoriesData, refetch: refreshCategories, error: categoryError } = useGetCategoriesQuery();
  const { data: discountsData, refetch: refreshDiscounts, error: discountError } = useGetDiscountsQuery();
  const { data: foodsData, refetch: refreshFoods } = useGetFoodsQuery();

  refreshFoods();
  const categoryFilterData = foodsData?.getFoods.filter((food) => food?.category === null);
  const discountFilterData = foodsData?.getFoods.filter((food) => food?.discount === null);

  const filteredData = activeMenuType === 'category' ? categoryFilterData : discountFilterData;

  useEffect(() => {
    if (categoriesData?.getCategories?.length) {
      setActiveMenu(categoriesData.getCategories[0]?.categoryId);
    }
  }, [categoriesData]);

  return (
    <Card data-testid="menu-product-card" className="flex flex-col w-full p-8 gap-4">
      <CardTitle className="text-xl leading-[28px] font-semibold text-[#000000]">Цэс</CardTitle>
      {categoryError || discountError ? (
        <CardContent data-testid="menu-product-error" className="flex flex-col p-0 gap-4">
          <p className="text-sm font-medium text-red-600">Мэдээлэл татахад алдаа гарлаа!</p>
        </CardContent>
      ) : (
        <CardContent className="flex flex-col w-full gap-4 p-0">
          <div data-testid="menu-title-list" className="flex">
            {categoriesData?.getCategories.map((category) => (
              <button
                data-testid={`category-button-${category?.categoryId}`}
                key={category?.categoryId}
                onClick={() => {
                  setActiveMenu(category?.categoryId);
                  setActiveMenuType('category');
                }}
                className={`border-b px-4 py-2  text-sm leading-[20px] pb-[8px] font-medium text-[#09090B] justify-center items-center ${
                  activeMenu === category?.categoryId ? 'border-b-[#09090B]' : 'border-b-[#E4E4E7]'
                }`}
              >
                {category?.categoryName}
              </button>
            ))}

            {discountsData?.getDiscounts.map((discount) => (
              <button
                data-testid={`discount-button-${discount?.discountId}`}
                key={discount?.discountId}
                onClick={() => {
                  setActiveMenu(discount?.discountId);
                  setActiveMenuType('discount');
                }}
                className={`flex gap-2 border-b px-4 py-2 text-sm leading-[20px] pb-[6px] font-medium text-[#09090B] justify-center items-center ${
                  activeMenu === discount?.discountId ? 'border-b-[#09090B]' : 'border-b-[#E4E4E7]'
                }`}
              >
                {discount?.discountName}
                <p className="text-sm leading-[20px] font-semibold text-red-500"> {discount?.discountRate}%</p>
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <FoodAddDialog type={activeMenuType} activeMenu={activeMenu as string} filteredData={filteredData as Food[]} refetchCategories={refreshCategories} refetchDiscounts={refreshDiscounts} />
          </div>
          <div>
            {activeMenuType === 'category' ? (
              <CategoryFoodsCard activeMenu={activeMenu as string} data={categoriesData?.getCategories as Category[]} refetch={refreshCategories} />
            ) : (
              <DiscountFoodsCard activeMenu={activeMenu as string} data={discountsData?.getDiscounts as Discount[]} refetch={refreshDiscounts} />
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
