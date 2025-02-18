'use client';

interface ItemsQuantityProps {
  food: {
    id: string;
    foodName: string;
    imageUrl: string;
    price: number;
    status: string;
    categoryId?: string | null;
  };
  orders: {
    _id: string;
    quantity: number;
  }[];
}

const ItemsQuantity: React.FC<ItemsQuantityProps> = ({ food, orders }) => {
  const order = orders.find((order) => order._id === food.id);

  return (
    <div className="h-full">
      {order && (
        <div className="w-full h-full bg-[#0000007b] flex justify-center items-center rounded-r-md">
          <span data-testid={`quantity-${food.id}`} className="text-lg font-semibold text-white">
            {order.quantity}
          </span>
        </div>
      )}
    </div>
  );
};

export default ItemsQuantity;
