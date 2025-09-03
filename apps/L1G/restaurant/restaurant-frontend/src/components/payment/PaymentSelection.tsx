'use client';

import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import jwt from 'jsonwebtoken';
import { OrderData, OrderTypeValue } from '@/types/order';
import { useCreateFoodOrderMutation } from '@/generated';

// Fix: Change the type to match your GraphQL schema
type FoodOrderItemInput = {
  foodId: string;
  quantity: number;
};

export default function PaymentSelection() {
  const orderData = typeof window !== 'undefined' ? localStorage.getItem('orderData') : null;
  const [order, setOrder] = useState<OrderData>();
  const [baseOrderAmount, setBaseOrderAmount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [deliveryOption, setDeliveryOption] = useState<OrderTypeValue | undefined>(undefined);
  const [isWalletDrawerOpen, setIsWalletDrawerOpen] = useState(false);
  const [targetAmount, setTargetAmount] = useState('');
  const [walletUsed, setWalletUsed] = useState(false);
  const [walletDeduction, setWalletDeduction] = useState(0);
  // Fix: Change the state type to match GraphQL input
  const [orderFood, setOrderFood] = useState<FoodOrderItemInput[]>([]);
  const [createOrder] = useCreateFoodOrderMutation();

  useEffect(() => {
    if (orderData) setOrder(JSON.parse(orderData));
  }, [orderData]);

  useEffect(() => {
    if (order) {
      const total = order.items.reduce((sum, v) => sum + Number(v.price) * v.selectCount, 0);
      setBaseOrderAmount(total);
      setDeliveryOption(order.orderType);
    }
  }, [order]);

  useEffect(() => {
    if (order?.items) {
      // Fix: Map to the correct property name
      setOrderFood(
        order.items.map((v) => ({
          foodId: String(v.id),
          quantity: Number(v.selectCount),
        }))
      );
    }
  }, [order?.items]);

  const baseOrderAmount = 53000;
  const deliveryFee = 4000;
  const totalBeforeWallet = baseOrderAmount + deliveryFee;
  const finalAmount = Math.max(0, totalBeforeWallet - walletDeduction);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const decoded: any = token ? jwt.decode(token) : null;
  const userId = String(decoded?.id || decoded?._id || decoded?.userId || '');

  const lsTableId = typeof window !== 'undefined' ? localStorage.getItem('tableId') : null;
  const lsTableName = typeof window !== 'undefined' ? localStorage.getItem('tableName') : null;
  const table = lsTableId ? String(JSON.parse(lsTableId)) : String(lsTableName ? JSON.parse(lsTableName) : '');
  console.log(orderFood, 'qq');

  const paymentMethods = useMemo(
    () => [
      { id: 'qpay', name: 'Qpay', icon: '/qpay.png' },
      { id: 'socialpay', name: 'Social Pay', icon: '/socialpay.png' },
      ...(!walletUsed ? [{ id: 'wallet', name: 'Хэтэвч', icon: '/log2.png' }] : []),
    ],
    [walletUsed]
  );

  const handleWalletOrder = () => {
    const deductionAmount = Math.max(0, Math.min(Number.parseInt(targetAmount) || 0, totalBeforeWallet));
    setWalletDeduction(deductionAmount);
    setWalletUsed(true);
    setSelectedPayment('');
    setIsWalletDrawerOpen(false);
    setTargetAmount('');
  };

  const handlePaymentSelect = async (methodId: string) => {
    setSelectedPayment(methodId);
    if (methodId === 'wallet') {
      setIsWalletDrawerOpen(true);
      return;
    }
    try {
      await createOrder({
        variables: {
          input: {
            user: userId,
            table,
            totalPrice: Number(finalAmount),
            // Fix: Use the correct property name that matches your GraphQL schema
            FoodOrderItem: orderFood,
          },
        },
      });
    } catch (e) {
      console.error('createOrder error', e);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      <div className="w-full h-fit flex justify-end">
        <button className="flex mt-[20px]">
          <X className="w-6 h-6 text-black" />
        </button>
      </div>

      <div className="flex items-center justify-between pt-[180px]">
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
            <SelectItem value="dinein">Газар дээр идэх</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex justify-between gap-4">
          {paymentMethods.map((method) => (
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
          ))}
        </div>

        <div>
          <div className="flex justify-between items-center border-b p-3">
            <span className="text-gray-600">Захиалгын нийт дүн:</span>
            <span className="font-medium">{baseOrderAmount.toLocaleString()}₮</span>
          </div>
          <div className="flex justify-between items-center border-b p-3">
            <span className="text-gray-600">Хоолны сав:</span>
            <span className="font-medium">{deliveryFee.toLocaleString()}₮</span>
          </div>
          {walletUsed && (
            <div className="flex justify-between items-center border-b">
              <span className="text-gray-600">Хэтэвчээс хасагдсан дүн:</span>
              <span className="font-medium">-{walletDeduction.toLocaleString()}₮</span>
            </div>
          )}
          <div className="flex justify-between items-center p-3">
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
              <Input
                placeholder="Зорилгын дүн"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg"
                type="number"
                min={0}
                max={totalBeforeWallet}
              />
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
