import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useGetOrderQuery } from '@/generated';
import { useAlert } from '../providers/AlertProvider';
/* eslint-disable */
export const OrderHistory = () => {
  const [sendRequest, setSendRequest] = useState(true);
  const { showAlert } = useAlert();
  const user = localStorage.getItem('user');

  let userID: string | null = null;
  if (user) {
    userID = JSON.parse(user)?._id;
  }

  const { data, loading, error } = useGetOrderQuery({
    variables: { userId: userID || '' },
    skip: !userID,
  });

  useEffect(() => {
    console.log('User ID:', userID);
    console.log('Fetched Data:', data);
  }, [data, userID]);

  if (loading)
    return (
      <div data-testid="gatgat" className="flex justify-center items-center w-full h-24">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-neutral-800 rounded-full"></div>

          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  if (error) {
    console.error('GraphQL Query Error:', error);
    showAlert('error', 'Захиалгын мэдээлэл авахад алдаа гарлаа.');
    return <p className="text-white">Алдаа гарлаа!</p>;
  }

  const orders = data?.getOrder || [];
  console.log(orders);
  if (orders.length === 0) {
    return <p className="text-white">Захиалгын түүх олдсонгүй.</p>;
  }

  return (
    <div className="flex flex-col gap-4 bg-[#131313] p-8 rounded-lg">
      {orders.map((order: any) => (
        <div key={order._id} className="flex flex-col gap-4">
          <div className="flex justify-between items-center w-[777px]">
            <div className="flex flex-row gap-4 font-thin">
              <div className="text-neutral-400 flex flex-row gap-2">
                Захиалгын дугаар: <p className="text-white">{order.ticketNumber}</p>
              </div>
              <div className="text-white flex flex-row items-center gap-2">
                <Clock className="w-5 h-5" />
                <a>{new Date(order.createdAt).toLocaleDateString('mn-MN')}</a>
              </div>
            </div>
          </div>

          {[
            { ticket: order.vipTicket, type: 'VIP', circleColor: '#4651C9' },
            { ticket: order.regularTicket, type: 'Regular', circleColor: '#ff8da1' },
            { ticket: order.standingAreaTicket, type: 'Standing Area', circleColor: '#D9D9D9' },
          ].map(
            ({ ticket, type, circleColor }) =>
              ticket?.quantity > 0 && (
                <div key={type} className="text-white flex flex-row justify-between border-[1px] border-dashed border-neutral-800 rounded-lg py-4 px-6">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="rounded-full w-3 h-3" style={{ backgroundColor: circleColor }}></div>
                    <a className="text-[#D7D7F8]">{type} Ticket</a>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <p className="text-neutral-500 font-thin">
                      {`${ticket.price}₮`} x {ticket.quantity}
                    </p>
                    <a className="text-lg font-thin">{ticket.price * ticket.quantity}₮</a>
                  </div>
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
};
