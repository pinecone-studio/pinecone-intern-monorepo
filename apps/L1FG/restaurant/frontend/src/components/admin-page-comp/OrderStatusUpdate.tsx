import { useState, useEffect } from 'react';
import { useUpdateOrderStatusMutation } from '@/generated';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface Order {
  _id: string;
  status: string;
}

interface OrderStatusProps {
  order: Order;
}

const OrderStatusUpdate: React.FC<OrderStatusProps> = ({ order }) => {
  // State to track the selected status for each order
  const [selectedStatus, setSelectedStatus] = useState<string>(order.status);

  // Apollo GraphQL mutation hook
  const [updateOrderStatus, { loading }] = useUpdateOrderStatusMutation();

  // Handle status change
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  // Handle Save
  const handleSave = async (orderId: string) => {
    try {
      await updateOrderStatus({ variables: { orderId, status: selectedStatus } });
      alert('Захиалга амжилттай шинэчлэгдлээ!');
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Make sure the selectedStatus is set correctly on initial render
  useEffect(() => {
    setSelectedStatus(order.status);
  }, [order.status]);

  return (
    <div className="w-full flex justify-end mt-2 gap-2">
      <Select value={selectedStatus} onValueChange={handleStatusChange}>
        <SelectTrigger data-testid="status-select-button" className="w-[180px]">
          <SelectValue placeholder="Хүлээгдэж буй" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="text-start">
            <SelectItem value="Ready">Бэлэн</SelectItem>
            <SelectItem value="Pending">Хүлээгдэж буй</SelectItem>
            <SelectItem value="InProcess">Хийгдэж буй</SelectItem>
            <SelectItem value="Done">Дууссан</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button data-testid="status-sub-btn" onClick={() => handleSave(order._id)} disabled={loading} className="px-4 py-2">
        Хадгалах
      </Button>
    </div>
  );
};

export default OrderStatusUpdate;
