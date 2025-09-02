'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import jwt from 'jsonwebtoken';
import { OrderData, OrderTypeValue } from '@/types/order';
import { useCreateFoodOrderMutation } from '@/generated';
import { set } from 'cypress/types/lodash';
import { array } from 'zod';

type foodOrderProps = [
  {
    foodName: string;
    quantity: string;
  }
];
type OrderProps = {
  foodOrder: foodOrderProps;
  userId: string;
  tableName: string;
  totalPrice: number;
};
export default function PaymentSelection() {
  const orderData = localStorage.getItem('orderData');
  const [order, setOrder] = useState<OrderData>();
  const [baseOrderAmount, setBaseOrderAmount] = useState(0);
  useEffect(() => {
    if (orderData) {
      setOrder(JSON.parse(orderData));
    }
  }, []);
  useEffect(() => {
    if (order) {
      const total = order.items.reduce((sum, val) => sum + parseInt(val.price) * val.selectCount, 0);
      setBaseOrderAmount(total);
    }
  }, [order]);

  useEffect(() => {
    if (order?.orderType) {
      setDeliveryOption(order.orderType);
    }
  }, [order]);

  const [selectedPayment, setSelectedPayment] = useState<string>('');

  const deliveryOptionFirstValue = order?.orderType;
  console.log(order, order?.orderType, deliveryOptionFirstValue, '00');
  const [deliveryOption, setDeliveryOption] = useState<OrderTypeValue | undefined>(order?.orderType);
  const [isWalletDrawerOpen, setIsWalletDrawerOpen] = useState(false);
  const [targetAmount, setTargetAmount] = useState('');
  const [walletUsed, setWalletUsed] = useState(false);
  const [walletDeduction, setWalletDeduction] = useState(0);

  const deliveryFee = 4000;
  const totalBeforeWallet = baseOrderAmount + deliveryFee;
  console.log(deliveryOptionFirstValue, deliveryOption);

  const paymentMethods = [
    {
      id: 'qpay',
      name: 'Qpay',
      icon: '/qpay.png',
    },
    {
      id: 'socialpay',
      name: 'Social Pay',
      icon: '/socialpay.png',
    },
    ...(!walletUsed
      ? [
          {
            id: 'wallet',
            name: 'Хэтэвч',
            icon: '/log2.png',
          },
        ]
      : []),
  ];

  const handleWalletOrder = () => {
    const deductionAmount = Number.parseInt(targetAmount) || 0;
    setWalletDeduction(deductionAmount);
    setWalletUsed(true);
    setSelectedPayment(''); // Reset selected payment
    setIsWalletDrawerOpen(false);
    setTargetAmount('');
  };

  const CheckoutButton = ({ foodOrder, userId, tableName, totalPrice }: OrderProps) => {
    const { createOrder } = useCreateFoodOrderMutation();
    const order = createOrder(foodOrder, userId, tableName, totalPrice);
    console.log(order, 'zahialaga');
  };
  const finalAmount = totalBeforeWallet - walletDeduction;
  const user = localStorage.getItem('token');
  const userid = jwt.decode(user!);
  const table = localStorage.getItem('tableName');
  const tableName = JSON.parse(table!);
  const [orderFood, setOrderFood] = useState<foodOrderProps[]>([]);
  order?.items.forEach((val) => {
    const foodName = val.foodName;
    const quantity = val.selectCount;
    setOrderFood((prevOrderFood) => [...prevOrderFood, { foodName, quantity }]);
  });

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPayment(methodId);
    if (methodId === 'wallet') {
      setIsWalletDrawerOpen(true);
    } else {
      CheckoutButton({ orderFood, userid, tableName, finalAmount });
    }
  };
  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      <div className="w-full h-fit flex justify-end">
        <button className="flex  mt-[20px]">
          <X className="w-6 h-6 text-black " />
        </button>
      </div>

      <div className="flex items-center justify-between pt-[180px] ">
        <h1 className="text-[20px] font-medium text-center flex-1">
          Төлбөрийн хэрэгслээ
          <br />
          сонгоно уу
        </h1>
      </div>
      <div className="flex flex-col p-4 gap-[40px] pt-[40px]">
        <Select value={deliveryOption} onValueChange={(value) => setDeliveryOption(value as OrderTypeValue)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Хүргэлтийн төрөл сонгоно уу" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="takeaway">Авч явах</SelectItem>
            <SelectItem value="dine_in">Эндээ идэх</SelectItem>
          </SelectContent>
        </Select>

        {/* Payment Methods */}
        <div className="flex justify-between  gap-4">
          {paymentMethods.map((method) => (
            <Card
              key={method.id}
              className={`p-4 w-full cursor-pointer transition-all ${selectedPayment === method.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
              onClick={() => handlePaymentSelect(method.id)}
            >
              <div className="flex flex-col justify-center items-center space-y-1 ">
                <div className="flex flex-col w-[40px] h-[40px]">
                  <img src={method.icon} alt="icon" className="flex w-full h-full" />
                </div>
                <span className="text-sm font-medium text-gray-700">{method.name}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Payment Summary */}
        <div className="">
          <div className="flex justify-between items-center border-b p-3">
            <span className="text-gray-600">Захиалгын нийт дүн:</span>
            <span className="font-medium">{baseOrderAmount.toLocaleString()}₮</span>
          </div>
          <div className="flex justify-between items-center border-b p-3">
            <span className="text-gray-600">Хүргэлт сав:</span>
            <span className="font-medium">{deliveryFee.toLocaleString()}₮</span>
          </div>
          {walletUsed && (
            <div className="flex justify-between items-center border-b p-3">
              <span className="text-gray-600">Хэтэвчээс хасагдсан дүн:</span>
              <span className="font-medium">-{walletDeduction.toLocaleString()}₮</span>
            </div>
          )}
          <div className="flex justify-between items-center p-3 ">
            <span className="font-medium">Төлөх дүн:</span>
            <span className="font-bold text-lg">{finalAmount.toLocaleString()}₮</span>
          </div>
        </div>
      </div>

      <Sheet open={isWalletDrawerOpen} onOpenChange={setIsWalletDrawerOpen}>
        <SheetContent side="bottom" className="h-auto rounded-t-xl">
          <SheetHeader className="text-center pb-6">
            <SheetTitle className="text-lg font-medium">Хэтэвчинд 18,864₮</SheetTitle>
            <p className="text-sm text-gray-600">Төлөх дүн: {totalBeforeWallet.toLocaleString()}₮</p>
          </SheetHeader>

          <div className="space-y-4">
            <div>
              <Input placeholder="Зорилгын дүн" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg" type="number" />
            </div>

            <Button className="w-full bg-amber-800 hover:bg-amber-900 text-white py-3 rounded-lg font-medium" onClick={handleWalletOrder}>
              Захиалах
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
