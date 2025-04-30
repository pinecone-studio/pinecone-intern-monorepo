import React from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  table: string;
  createdAt: string;
  items: OrderItem[];
  status: string;
  totalPrice: number;
}

interface OrderFoodCardProps {
  orders: Order[];
}

const OrderFoodCard: React.FC<OrderFoodCardProps> = ({ orders }) => {
  return (
    <div data-testid="order-food-card">
      {orders.map((order) => (
        <div key={order.id}>
          {order.items.map((food) => (
            <div key={food.id}>
              <img data-testid="food-image" src={food.image} alt={food.name} />
              <p>{food.name}</p>
              <p>{food.price}₮</p>
              <p>{food.quantity}ш</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderFoodCard;
