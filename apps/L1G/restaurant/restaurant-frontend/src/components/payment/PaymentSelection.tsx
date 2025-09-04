'use client';
import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { OrderData } from '@/types/order';
import { FoodServeType, useCreateFoodOrderMutation } from '@/generated';
import PaymentCard from './PaymentCard';
import { handleWalletOrder as doHandleWalletOrder, handlePaymentSelect as doHandlePaymentSelect, type FoodOrderItemInput } from '../../utils/Payment-Logic';
import { useRouter } from 'next/navigation';
import { loadOrderData, getUserIdFromToken, getTableId } from '@/utils/storage';
const DELIVERY_FEE = 4000;
const PaymentSelection = () => {
  const router = useRouter();
  const [createOrder] = useCreateFoodOrderMutation();
  const [order, setOrder] = useState<OrderData>();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<FoodServeType | undefined>(undefined);
  const [isWalletDrawerOpen, setIsWalletDrawerOpen] = useState(false);
  const [targetAmount, setTargetAmount] = useState('');
  const [wallet, setWallet] = useState<{ used: boolean; deduction: number }>({ used: false, deduction: 0 });
  useEffect(() => {
    const data = loadOrderData();
    if (data) setOrder(data);
  }, []);
  const { userId, table } = useMemo(() => {
    return {
      userId: getUserIdFromToken(),
      table: getTableId(),
    };
  }, []);
  const baseOrderAmount = useMemo(() => (order?.items ?? []).reduce((sum, v) => sum + Number(v.price) * v.selectCount, 0), [order?.items]);
  const orderFood: FoodOrderItemInput[] = useMemo(() => (order?.items ?? []).map((v) => ({ foodId: String(v.id), quantity: Number(v.selectCount) })), [order?.items]);
  useEffect(() => {
    if (order?.orderType) setDeliveryOption(order.orderType as FoodServeType);
  }, [order?.orderType]);
  const totalBeforeWallet = baseOrderAmount + DELIVERY_FEE;
  const finalAmount = Math.max(0, totalBeforeWallet - wallet.deduction);
  const paymentMethods = useMemo(
    () => [
      { id: 'qpay', name: 'Qpay', icon: '/qpay.png' },
      { id: 'socialpay', name: 'Social Pay', icon: '/socialpay.png' },
      ...(!wallet.used ? [{ id: 'wallet', name: 'Хэтэвч', icon: '/log2.png' }] : []),
    ],
    [wallet.used]
  );
  const onWalletOrder = () =>
    doHandleWalletOrder({
      targetAmount,
      totalBeforeWallet,
      setWalletDeduction: (v: number) => setWallet((s) => ({ ...s, deduction: v })),
      setWalletUsed: (v: boolean) => setWallet((s) => ({ ...s, used: v })),
      setSelectedPayment,
      setIsWalletDrawerOpen,
      setTargetAmount,
    });
  const onPaymentSelect = (methodId: string) =>
    doHandlePaymentSelect({
      methodId,
      setSelectedPayment,
      setIsWalletDrawerOpen,
      createOrder,
      userId,
      table,
      finalAmount,
      orderFood,
      orderType: deliveryOption,
    });
  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      <div className="w-full flex justify-end">
        <button onClick={() => router.push('/')} className="flex mt-5" aria-label="Back">
          <X className="w-6 h-6 text-black" />
        </button>
      </div>
      <div className="flex items-center justify-between pt-44">
        <h1 className="text-20 font-medium text-center flex-1">
          Төлбөрийн хэрэгслээ
          <br />
          сонгоно уу
        </h1>
      </div>
      <div className="flex flex-col p-4 gap-10 pt-10">
        <Select value={deliveryOption} onValueChange={(v) => setDeliveryOption(v as FoodServeType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Хүргэлтийн төрөл сонгоно уу" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GO">Авч явах</SelectItem>
            <SelectItem value="IN">Эндээ идэх</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex justify-between gap-4">
          {paymentMethods.map((m) => (
            <PaymentCard key={m.id} selectedPayment={selectedPayment} method={m} handlePaymentSelect={onPaymentSelect} />
          ))}
        </div>
        <div>
          {[
            { label: 'Захиалгын нийт дүн:', value: baseOrderAmount },
            { label: 'Хоолны сав:', value: DELIVERY_FEE },
            ...(wallet.used ? [{ label: 'Хэтэвчээс хасагдсан дүн:', value: -wallet.deduction }] : []),
          ].map((row, i) => (
            <div key={i} className="flex justify-between items-center border-b p-3">
              <span className="text-gray-600">{row.label}</span>
              <span className="font-medium">
                {row.value < 0 ? '-' : ''}
                {Math.abs(row.value).toLocaleString()}₮
              </span>
            </div>
          ))}
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
            <Input
              placeholder="дүн"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg"
              type="number"
              min={0}
              max={totalBeforeWallet}
            />
            <Button className="w-full bg-amber-800 hover:bg-amber-900 text-white py-3 rounded-lg font-medium" onClick={onWalletOrder}>
              Захиалах
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default PaymentSelection;
