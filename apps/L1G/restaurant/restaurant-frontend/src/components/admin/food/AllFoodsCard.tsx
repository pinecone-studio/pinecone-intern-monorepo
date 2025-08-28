'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Food, useDeleteFoodMutation, useGetFoodsQuery } from '@/generated';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteDialog, FoodCreateDialog, FoodUpdateDialog } from '@/components/admin';

export const AllFoodsCard = () => {
  const { loading, error, data, refetch } = useGetFoodsQuery();
  const [deleteFood] = useDeleteFoodMutation();

  const handleDeleteButton = async (foodId: string) => {
    try {
      await deleteFood({
        variables: { foodId: foodId },
      });
      refetch();
      toast.success('Хоол амжилттай устгагдлаа!', {
        position: 'bottom-right',
      });
    } catch (error: any) {
      toast.error('Хоол устгахад алдаа гарлаа!', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <div data-cy="allfoods" className="flex flex-col w-[600px] h-[691px] gap-5 top-[219px] left-[500px]">
      <div className="flex items-center justify-between">
        <h2 data-testid="allfoods-title" className="text-[28px] font-semibold text-[#000000] leading-[28px]">
          Хоол
        </h2>
        <FoodCreateDialog refetch={refetch} />
      </div>
      {loading ? (
        <Card data-cy="allfoods-loading" data-testid="allfoods-loading" className="flex flex-col w-full h-[631px] p-8 gap-4 rounded-lg border solid border-[#E4E4E7] bg-[#FFFFFF] text-start text-base">
          Loading...
        </Card>
      ) : error ? (
        <Card data-testid="allfoods-error" className="flex flex-col w-full h-[631px] p-8 gap-4 rounded-lg border solid border-[#E4E4E7] bg-[#FFFFFF]">
          <p className="text-sm font-medium text-red-600">Алдаа гарлаа: Хоолны мэдээлэл татаж чадсангүй!</p>
        </Card>
      ) : (
        <Card data-cy="allfoods-food-list" data-testid="allfoods-food-list" className="flex flex-col w-full h-[631px] p-8 gap-4 rounded-lg border solid border-[#E4E4E7] bg-[#FFFFFF] overflow-scroll">
          {data?.getFoods.length === 0 && (
            <div data-testid="allfoods-no-foods" className="text-start text-gray-500 text-base">
              Одоогоор хоол бүртгэгдээгүй байна.
            </div>
          )}
          {data?.getFoods.map((food, i) => (
            <div data-cy={`allfoods-food-${i}`} key={food?.foodId} className="flex flex-col gap-4">
              <CardContent className="flex w-full h-[87px] justify-between p-0">
                <div className="relative w-[87px] h-[87px] rounded-lg">
                  <Image data-testid="allfoods-food-image" src={food?.image as string} alt="image" priority sizes="auto" fill className="rounded-lg" />
                </div>
                <div className="flex flex-col gap-2 w-[345px] h-[87px]">
                  <p className="text-base font-light leading-[20px] text-[#09090B]">{food?.foodName}</p>
                  <span className="text-lg font-bold leading-[20px] text-[#09090B]">{(Number(food?.price) / 1000).toFixed(1)}k</span>
                  <Badge variant="outline" className="w-fit text-xs font-semibold leading-[16px] text-[#09090B]">
                    {food?.foodStatus}
                  </Badge>
                </div>
                <FoodUpdateDialog {...(food as Food)} refetch={refetch} />
                <DeleteDialog title="Устгах" comment="Устгахдаа итгэлтэй байна уу" submitText="Устгах" onClick={() => handleDeleteButton(food?.foodId as string)}>
                  <div data-cy={`delete-dialog-trigger-${i}`} data-testid={`delete-dialog-trigger-${food?.foodId}`}>
                    <Trash className="w-4 h-4" />
                  </div>
                </DeleteDialog>
              </CardContent>
              <Separator className="w-[536px] border solid border-[#E4E4E7]" />
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};
