export type OrderCardProps = {
    orderNumber: string;
    table: string;
    time: string;
    total: string;
    status: string;
    items: {
        name: string;
        image: string;
        quantity: number;
        price: string;
    }[];
    };
  