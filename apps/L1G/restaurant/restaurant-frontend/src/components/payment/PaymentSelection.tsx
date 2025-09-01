'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import jwt from 'jsonwebtoken';
export default function PaymentSelection() {
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [deliveryOption, setDeliveryOption] = useState('takeaway');
  const [isWalletDrawerOpen, setIsWalletDrawerOpen] = useState(false);
  const [targetAmount, setTargetAmount] = useState('');
  const [walletUsed, setWalletUsed] = useState(false);
  const [walletDeduction, setWalletDeduction] = useState(0);

  const baseOrderAmount = 53000;
  const deliveryFee = 4000;
  const totalBeforeWallet = baseOrderAmount + deliveryFee;

  const paymentMethods = [
    {
      id: 'qpay',
      name: 'Qpay',
      icon: (
        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">Q</span>
        </div>
      ),
    },
    {
      id: 'socialpay',
      name: 'Social Pay',
      icon: (
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      ),
    },
    ...(!walletUsed
      ? [
          {
            id: 'wallet',
            name: 'Хэтэвч',
            icon: (
              <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                <div className="w-8 h-6 bg-orange-600 rounded-sm relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-4 h-2 bg-orange-600 rounded-t"></div>
                </div>
              </div>
            ),
          },
        ]
      : []),
  ];

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPayment(methodId);
    if (methodId === 'wallet') {
      setIsWalletDrawerOpen(true);
    }
  };

  const handleWalletOrder = () => {
    const deductionAmount = Number.parseInt(targetAmount) || 0;
    setWalletDeduction(deductionAmount);
    setWalletUsed(true);
    setSelectedPayment(''); // Reset selected payment
    setIsWalletDrawerOpen(false);
    setTargetAmount('');
  };

  const finalAmount = totalBeforeWallet - walletDeduction;
  const user = localStorage.getItem('token');
  const userid = jwt.decode(user!);
  console.log(userid.user._id);

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      <div className="w-full h-fit flex justify-end">
        <button className="flex  mt-[20px]">
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <div className="flex items-center justify-between pt-[180px] ">
        <div className="w-6"></div>
        <h1 className="text-lg font-medium text-center flex-1">
          Төлбөрийн хэрэгслээ
          <br />
          сонгоно уу
        </h1>
      </div>
      <div className="p-4 space-y-6 pt-[100px]">
        <Select value={deliveryOption} onValueChange={setDeliveryOption}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Хүргэлтийн төрөл сонгоно уу" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="takeaway">Авч явах</SelectItem>
            <SelectItem value="dinein">Газар дээр идэх</SelectItem>
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
              <div className="flex flex-col items-center space-y-2">
                {method.icon}
                <span className="text-sm font-medium text-gray-700">{method.name}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Payment Summary */}
        <div className="space-y-3 pt-8">
          <div className="flex justify-between items-center border-b">
            <span className="text-gray-600">Захиалгын нийт дүн:</span>
            <span className="font-medium">{baseOrderAmount.toLocaleString()}₮</span>
          </div>
          <div className="flex justify-between items-center border-b">
            <span className="text-gray-600">Хүргэлт сав:</span>
            <span className="font-medium">{deliveryFee.toLocaleString()}₮</span>
          </div>
          {walletUsed && (
            <div className="flex justify-between items-center border-b">
              <span className="text-gray-600">Хэтэвчээс хасагдсан дүн:</span>
              <span className="font-medium">-{walletDeduction.toLocaleString()}₮</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 ">
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
