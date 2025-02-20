'use client';

import { createContext, useContext } from 'react';
import { useUpdateOrderReadMutation } from '@/generated';

interface OrderContextType {
  markOrderAsRead: (_orderId: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType>({
  markOrderAsRead: async () => {
    return;
  },
});

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [updateOrderRead] = useUpdateOrderReadMutation();

  const markOrderAsRead = async (orderId: string) => {
    try {
      await updateOrderRead({ variables: { orderId } });
    } catch (error) {
      console.error('Error updating order read status:', error);
    }
  };

  return <OrderContext.Provider value={{ markOrderAsRead }}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
