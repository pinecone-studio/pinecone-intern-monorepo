import { OrderCardProps } from '@/types/order';
export const mockOrders: OrderCardProps[] = [
  {
    orderNumber: "1234",
    table: "A1",
    time: "14:30",
    items: [
      {
        name: "Burger",
        price: "7500",
        quantity: 1,
        image: "https://via.placeholder.com/56",
      },
    ],
    total: "7500",
    status: "new",
  },
  {
    orderNumber: "5678",
    table: "B2",
    time: "15:10",
    items: [
      {
        name: "Pizza",
        price: "9500",
        quantity: 2,
        image: "https://via.placeholder.com/56",
      },
    ],
    total: "19000",
    status: "completed",
  },
];
