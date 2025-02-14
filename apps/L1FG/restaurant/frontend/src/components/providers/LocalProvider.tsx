'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export type FoodItems = {
  _id: string;
  foodName: string;
  quantity: number;
  price: number;
  imageUrl: string;
  categoryId?: string | null;
  createdAt?: string;
  status?: string;
};

interface Order {
  tableId: number;
  status: string;
  items: FoodItems[];
}

interface CartContextType {
  orders: FoodItems[];
  tableId: number;
  setTableId: (_tableId: number) => void;
  addToCart: (_newItem: FoodItems) => void;
  removeFromCart: (_itemId: string) => void;
  clearCart: () => void;
  minusFromCart: (_newItem: FoodItems) => void;
  getFormattedOrder: () => Order;
  cartItemsTotalPrice: number;
  deliveryFee: number;
}

const CartContext = createContext<CartContextType>({
  orders: [],
  tableId: 0,
  setTableId: () => {
    return;
  },
  addToCart: () => {
    return;
  },
  removeFromCart: () => {
    return;
  },
  clearCart: () => {
    return;
  },
  minusFromCart: () => {
    return;
  },
  getFormattedOrder: () => ({ tableId: 0, status: 'Pending', items: [] }),
  cartItemsTotalPrice: 0,
  deliveryFee: 0,
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<FoodItems[]>([]);
  const [tableId, setTableId] = useState<number>(0);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('order');
    if (storedCartItems) {
      setOrders(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('order', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (newItem: FoodItems) => {
    const existingItem = orders.find((order) => order._id === newItem._id);

    if (existingItem) {
      setOrders(orders.map((order) => (order._id === newItem._id ? { ...order, quantity: order.quantity + 1 } : order)));
    } else {
      setOrders([...orders, newItem]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setOrders(orders.filter((item) => item._id !== itemId));
  };

  const minusFromCart = (newItem: FoodItems) => {
    setOrders(orders.map((order) => (order._id === newItem._id ? { ...order, quantity: Math.max(1, order.quantity - 1) } : order)));
  };

  const clearCart = () => {
    setOrders([]);
  };

  const cartItemsTotalPrice = orders.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const deliveryFee = orders.length > 0 ? 5000 : 0;

  const getFormattedOrder = (): Order => ({
    tableId,
    status: 'Pending',
    items: orders,
  });

  return (
    <CartContext.Provider
      value={{
        orders,
        tableId,
        setTableId,
        addToCart,
        removeFromCart,
        clearCart,
        minusFromCart,
        getFormattedOrder,
        cartItemsTotalPrice,
        deliveryFee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
