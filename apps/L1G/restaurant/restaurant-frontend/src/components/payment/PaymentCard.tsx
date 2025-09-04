import { Card } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';
type methodProps = {
  id: string;
  icon: string;
  name: string;
};
type PeymentCardProps = {
  selectedPayment: string;
  method: methodProps;
  handlePaymentSelect: (_id: string) => void;
};

const PaymentCard = ({ selectedPayment, method, handlePaymentSelect }: PeymentCardProps) => {
  return (
    <Card
      key={method.id}
      className={`p-4 w-full cursor-pointer transition-all ${selectedPayment === method.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
      onClick={() => handlePaymentSelect(method.id)}
    >
      <div className="flex flex-col justify-center items-center space-y-1">
        <div className="flex flex-col w-[40px] h-[40px] relative">
          <Image src={method.icon} alt="icon" fill className="object-contain" />
        </div>
        <span className="text-sm font-medium text-gray-700">{method.name}</span>
      </div>
    </Card>
  );
};

export default PaymentCard;
