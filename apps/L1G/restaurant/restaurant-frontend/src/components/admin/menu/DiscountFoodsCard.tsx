import { toast } from 'sonner';
import { Discount, GetDiscountsQuery, useDeleteFoodFromDiscountMutation } from '@/generated';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { DeleteDialog } from '../DeleteDialog';
import { Minus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ApolloQueryResult } from '@apollo/client';

export const DiscountFoodsCard = ({ activeMenu, data, refetch }: { activeMenu: string; data: Discount[]; refetch: () => Promise<ApolloQueryResult<GetDiscountsQuery>> }) => {
  const [deleteDiscountFood] = useDeleteFoodFromDiscountMutation();

  const handleDeleteDiscountFood = async (discountId: string, foodId: string) => {
    try {
      await deleteDiscountFood({
        variables: {
          discountId: discountId,
          foodId: foodId,
        },
      });
      await refetch();
      toast.success('Хямдралаас амжилттай хасагдлаа!', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Хямдралаас хасахад алдаа гарлаа!', {
        position: 'bottom-right',
      });
    }
  };

  function shortPrice(price: number) {
    if (price >= 1000) {
      return `${(price / 1000).toFixed(3).replace(/\.?0+$/, '')}k`;
    }
    return `${price}`;
  }

  return (
    <div className="flex flex-col gap-4 max-h-[450px] h-fit overflow-scroll">
      {data?.map(
        (discount) =>
          discount?.discountId === activeMenu &&
          discount?.food?.map((food) => (
            <div key={food?.foodId} className="flex flex-col gap-4">
              <div data-testid={`food-with-discount-${food?.foodId}`} className="flex w-full h-[87px] justify-between p-0">
                <div className="relative w-[87px] h-[87px] rounded-lg">
                  <Image data-testid="allfoods-food-image" src={food?.image as string} alt="image" priority sizes="auto" fill className="rounded-lg" />
                </div>
                <div className="flex flex-col gap-2 w-[345px] h-[87px]">
                  <p className="text-base font-light leading-[20px] text-[#09090B]">{food?.foodName}</p>
                  <span className="text-lg font-bold leading-[20px] text-[#09090B]">{shortPrice(parseInt(food?.price as string))}</span>
                  <Badge variant="outline" className="w-fit text-xs font-semibold leading-[16px] text-[#09090B]">
                    {food?.foodStatus}
                  </Badge>
                </div>
                <DeleteDialog
                  className="bg-[#1D1F24] hover:bg-primary"
                  title="Цэснээс хасах"
                  comment="Хасахдаа итгэлтэй байна уу"
                  submitText="Хасах"
                  onClick={() => handleDeleteDiscountFood(discount.discountId, food?.foodId as string)}
                >
                  <div data-testid={`from-discount-delete-dialog-${food?.foodId}`}>
                    <Minus className="w-4 h-4 stroke-white" />
                  </div>
                </DeleteDialog>
              </div>
              <Separator className="w-[536px] border solid border-[#E4E4E7]" />
            </div>
          ))
      )}
    </div>
  );
};
