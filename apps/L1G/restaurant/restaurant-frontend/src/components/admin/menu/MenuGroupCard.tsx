'use client';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category, Discount, useDeleteCategoryMutation, useDeleteDiscountMutation, useGetCategoriesQuery, useGetDiscountsQuery } from '@/generated';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { CategoryCreateDialog, CategoryUpdateDialog, DeleteDialog, DiscountCreateDialog, DiscountUpdateDialog } from '@/components/admin';

export const MenuGroupCard = () => {
  const { data: categoriesData, refetch: refreshCategories } = useGetCategoriesQuery();
  const { data: discountsData, refetch: refreshDiscounts } = useGetDiscountsQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteDiscount] = useDeleteDiscountMutation();

  const handleCategoryDelete = async (categoryId: string) => {
    try {
      await deleteCategory({
        variables: { categoryId: categoryId },
      });
      await refreshCategories();
      toast.success('Цэсний ангилал амжилттай устгагдлаа!', {
        position: 'bottom-right',
      });
    } catch (error: any) {
      toast.error('Цэсний ангилал устгахад алдаа гарлаа!', {
        position: 'bottom-right',
      });
    }
  };

  const handleDiscountDelete = async (discountId: string) => {
    try {
      await deleteDiscount({
        variables: { discountId: discountId },
      });
      await refreshDiscounts();
      toast.success('Хямдрал амжилттай устгагдлаа!', {
        position: 'bottom-right',
      });
    } catch (error: any) {
      toast.error('Хямдрал устгахад алдаа гарлаа!', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <Card className="flex flex-col gap-4 p-8">
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl leading-[28px] font-semibold text-[#000000]">Цэс удирдах</CardTitle>
        <div className="flex gap-2">
          <DiscountCreateDialog refetch={refreshDiscounts} />
          <CategoryCreateDialog refetch={refreshCategories} />
        </div>
      </div>
      <Tabs defaultValue="Бүгд">
        <TabsList>
          <TabsTrigger data-testid="menu-group-tab" className="w-[120px]" value="Бүгд">
            Бүгд
          </TabsTrigger>
          <TabsTrigger className="w-[120px]" value="Цэс">
            Цэс
          </TabsTrigger>
          <TabsTrigger className="w-[120px]" value="Хямдрал">
            Хямдрал
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Бүгд">
          <CardContent data-testid="menu-group-card" className="gap-6">
            {categoriesData?.getCategories.map((category) => (
              <div data-testid="menu-category" key={category?.categoryId} className="gap-4 items-start">
                <div className="flex justify-between items-center p-2">
                  <p className="text-base leading-[20px] text-foreground">{category?.categoryName}</p>
                  <div className="flex gap-2">
                    <CategoryUpdateDialog {...(category as Category)} refetch={refreshCategories} />
                    <DeleteDialog title="Цэснээс хасах" comment="Хасахдаа итгэлтэй байна уу" submitText="Хасах" onClick={() => handleCategoryDelete(category?.categoryId as string)}>
                      <div data-testid={`delete-dialog-trigger`}>
                        <Trash className="w-4 h-4" />
                      </div>
                    </DeleteDialog>
                  </div>
                </div>
                <Separator />
              </div>
            ))}

            {discountsData?.getDiscounts.map((discount) => (
              <div data-testid="menu-discount" key={discount?.discountId} className="gap-4 items-start">
                <div className="flex justify-between items-center p-2">
                  <div className="flex gap-2 justify-center items-center">
                    <div className="flex gap-1 justify-center items-center">
                      <p className="text-base leading-[20px] text-[#09090B]">{discount?.discountName} </p>/{' '}
                      <p className="text-base leading-[20px] font-bold text-[#09090B]">{discount?.discountRate}%</p>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                      <p>
                        {new Date(parseInt(discount?.startDate as string)).getMonth() + 1}.{new Date(parseInt(discount?.startDate as string)).getDate()}
                      </p>
                      -
                      <p>
                        {new Date(parseInt(discount?.endDate as string)).getMonth() + 1}.{new Date(parseInt(discount?.endDate as string)).getDate()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <DiscountUpdateDialog {...(discount as Discount)} refetch={refreshDiscounts} />
                    <DeleteDialog title="Цэснээс хасах" comment="Хасахдаа итгэлтэй байна уу" submitText="Хасах" onClick={() => handleDiscountDelete(discount?.discountId as string)}>
                      <div data-testid={`delete-dialog-trigger`}>
                        <Trash className="w-4 h-4" />
                      </div>
                    </DeleteDialog>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
