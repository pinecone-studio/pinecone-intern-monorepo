import Image from 'next/image';

export type Food = {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type RenderFoodCardProps = {
  orders: Food[];
};

const OrderFoodCard = ({ orders }: RenderFoodCardProps) => {
  return (
    <div data-cy="Foods" className="flex flex-col mt-5 gap-5">
      {orders.map((order) => (
        <div key={order.id} className="flex w-[536px] gap-5">
          <div className="h-[86px] w-[86px] overflow-hidden rounded-lg text-bold">
            <Image src={order.image} width={86} height={86} alt={order.name} className="object-cover" />
          </div>
          <div className="flex flex-col">
            <p>{order.name}</p>
            <p className="font-bold text-[#09090B] text-[18px]">{order.price}k</p>
            <p className="font-bold text-[#09090B] text-[18px]">{order.quantity}ш</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderFoodCard;
