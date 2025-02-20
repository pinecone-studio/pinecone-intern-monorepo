'use client';

import { X } from 'lucide-react';
import { useCart } from '../providers';

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

const ClickedOrder: React.FC<ItemsQuantityProps> = ({ food, orders }) => {
  const clickedFood = orders.find((order) => order._id === food.id);
  const { removeFromCart } = useCart();

  const handleDelete = (id: string) => {
    removeFromCart(id);
  };
  return (
    <div className="h-full">
      {clickedFood && (
        <button
          className={` absolute top-2 right-2 text-gray-300 `}
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(food.id);
          }}
          data-testid={`delete-button-${food.id}`}
        >
          <X />
        </button>
      )}
    </div>
  );
};

export default ClickedOrder;
