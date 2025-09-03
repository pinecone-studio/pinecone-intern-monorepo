import { FoodServeType } from '@/generated';

export type FoodOrderItemInput = { foodId: string; quantity: number };
export type HandleWalletOrderArgs = {
  targetAmount: string;
  totalBeforeWallet: number;
  setWalletDeduction: (v: number) => void;
  setWalletUsed: (v: boolean) => void;
  setSelectedPayment: (v: string) => void;
  setIsWalletDrawerOpen: (v: boolean) => void;
  setTargetAmount: (v: string) => void;
};

export const handleWalletOrder = ({ targetAmount, totalBeforeWallet, setWalletDeduction, setWalletUsed, setSelectedPayment, setIsWalletDrawerOpen, setTargetAmount }: HandleWalletOrderArgs): void => {
  const amt = Math.max(0, Math.min(Number.parseInt(targetAmount) || 0, totalBeforeWallet));
  setWalletDeduction(amt);
  setWalletUsed(true);
  setSelectedPayment('');
  setIsWalletDrawerOpen(false);
  setTargetAmount('');
};

export type HandlePaymentSelectArgs = {
  methodId: string;
  setSelectedPayment: (v: string) => void;
  setIsWalletDrawerOpen: (v: boolean) => void;
  createOrder: (args: { variables: { input: { user: string; table: string; totalPrice: number; FoodOrderItem: FoodOrderItemInput[]; orderType: FoodServeType } } }) => Promise<unknown>;
  userId: string;
  table: string;
  finalAmount: number;
  orderFood: FoodOrderItemInput[];
  orderType?: FoodServeType;
};

export const handlePaymentSelect = async ({
  methodId,
  setSelectedPayment,
  setIsWalletDrawerOpen,
  createOrder,
  userId,
  table,
  finalAmount,
  orderFood,
  orderType,
}: HandlePaymentSelectArgs): Promise<void> => {
  setSelectedPayment(methodId);
  if (methodId === 'wallet') {
    setIsWalletDrawerOpen(true);
    return;
  }
  await createOrder({
    variables: { input: { user: userId, table, totalPrice: Number(finalAmount), FoodOrderItem: orderFood, orderType: orderType as FoodServeType } },
  });
};
