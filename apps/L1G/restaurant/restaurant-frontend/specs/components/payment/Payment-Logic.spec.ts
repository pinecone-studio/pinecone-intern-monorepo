/* eslint max-lines: "off" */
import { handleWalletOrder, handlePaymentSelect, type FoodOrderItemInput } from '@/utils/Payment-Logic';
describe('payment-logic: handleWalletOrder', () => {
  const mkSetters = () => {
    const setWalletDeduction = jest.fn<(_v: number) => void>();
    const setWalletUsed = jest.fn<(_v: boolean) => void>();
    const setSelectedPayment = jest.fn<(_v: string) => void>();
    const setIsWalletDrawerOpen = jest.fn<(_v: boolean) => void>();
    const setTargetAmount = jest.fn<(_v: string) => void>();
    return { setWalletDeduction, setWalletUsed, setSelectedPayment, setIsWalletDrawerOpen, setTargetAmount };
  };

  it('зорилгын дүнг зөв оноож, бусад төлвүүдийг шинэчилнэ', () => {
    const s = mkSetters();
    handleWalletOrder({
      targetAmount: '5000',
      totalBeforeWallet: 32000,
      setWalletDeduction: s.setWalletDeduction,
      setWalletUsed: s.setWalletUsed,
      setSelectedPayment: s.setSelectedPayment,
      setIsWalletDrawerOpen: s.setIsWalletDrawerOpen,
      setTargetAmount: s.setTargetAmount,
    });

    expect(s.setWalletDeduction).toHaveBeenCalledWith(5000);
    expect(s.setWalletUsed).toHaveBeenCalledWith(true);
    expect(s.setSelectedPayment).toHaveBeenCalledWith('');
    expect(s.setIsWalletDrawerOpen).toHaveBeenCalledWith(false);
    expect(s.setTargetAmount).toHaveBeenCalledWith('');
  });

  it('нийт дүнгээс их тохиолдолд clamp хийж нийт дүнг л хасна', () => {
    const s = mkSetters();
    handleWalletOrder({
      targetAmount: '100000',
      totalBeforeWallet: 32000,
      setWalletDeduction: s.setWalletDeduction,
      setWalletUsed: s.setWalletUsed,
      setSelectedPayment: s.setSelectedPayment,
      setIsWalletDrawerOpen: s.setIsWalletDrawerOpen,
      setTargetAmount: s.setTargetAmount,
    });

    expect(s.setWalletDeduction).toHaveBeenCalledWith(32000);
  });

  it('хоосон/NaN үед 0 гэж үзнэ', () => {
    const s = mkSetters();
    handleWalletOrder({
      targetAmount: '',
      totalBeforeWallet: 32000,
      setWalletDeduction: s.setWalletDeduction,
      setWalletUsed: s.setWalletUsed,
      setSelectedPayment: s.setSelectedPayment,
      setIsWalletDrawerOpen: s.setIsWalletDrawerOpen,
      setTargetAmount: s.setTargetAmount,
    });

    expect(s.setWalletDeduction).toHaveBeenCalledWith(0);
  });
});

describe('payment-logic: handlePaymentSelect', () => {
  const baseArgs = (overrides?: Partial<Parameters<typeof handlePaymentSelect>[0]>) => {
    const createOrder = jest
      .fn<Promise<unknown>, [{ variables: { input: { user: string; table: string; totalPrice: number; FoodOrderItem: FoodOrderItemInput[] } } }]>()
      .mockResolvedValue({ data: { ok: true } });

    const setSelectedPayment = jest.fn<(_v: string) => void>();
    const setIsWalletDrawerOpen = jest.fn<(_v: boolean) => void>();

    const args = {
      methodId: 'qpay',
      setSelectedPayment,
      setIsWalletDrawerOpen,
      createOrder,
      userId: 'user-123',
      table: 'T-01',
      finalAmount: 30000,
      orderFood: [
        { foodId: 'f1', quantity: 2 },
        { foodId: 'f2', quantity: 1 },
      ] as FoodOrderItemInput[],
      ...overrides,
    };

    return { ...args, createOrder };
  };

  it('wallet сонгогдвол зөвхөн drawer-ийг нээж, createOrder-ыг дуудахгүй', async () => {
    const a = baseArgs({ methodId: 'wallet' });
    await handlePaymentSelect(a);

    expect(a.setSelectedPayment).toHaveBeenCalledWith('wallet');
    expect(a.setIsWalletDrawerOpen).toHaveBeenCalledWith(true);
    expect(a.createOrder).not.toHaveBeenCalled();
  });

  it('qpay/socialpay үед createOrder-ыг зөв хувьсагчаар дуудна', async () => {
    const a = baseArgs({ methodId: 'qpay', finalAmount: 30000 });
    await handlePaymentSelect(a);

    expect(a.setSelectedPayment).toHaveBeenCalledWith('qpay');
    expect(a.setIsWalletDrawerOpen).not.toHaveBeenCalled();

    expect(a.createOrder).toHaveBeenCalledTimes(1);
    const call = a.createOrder.mock.calls[0][0];
    expect(call.variables.input.user).toBe('user-123');
    expect(call.variables.input.table).toBe('T-01');
    expect(call.variables.input.totalPrice).toBe(30000);
    expect(call.variables.input.FoodOrderItem).toEqual([
      { foodId: 'f1', quantity: 2 },
      { foodId: 'f2', quantity: 1 },
    ]);
  });

  it('finalAmount тоон төрөлд хөрвүүлэгдэж очно', async () => {
    const a = baseArgs({ finalAmount: Number('25000') });
    await handlePaymentSelect(a);

    const { totalPrice } = a.createOrder.mock.calls[0][0].variables.input;
    expect(totalPrice).toBe(25000);
  });
});
describe('utils/Payment-Logic → handlePaymentSelect', () => {
  it('non-wallet үед createOrder дуудагдаж дууссаны дараа navigate("/PaymentSuccess") дуудна', async () => {
    const createOrder = jest.fn().mockResolvedValue(undefined);
    const navigate = jest.fn();

    const setSelectedPayment = jest.fn();
    const setIsWalletDrawerOpen = jest.fn();

    const orderFood: FoodOrderItemInput[] = [{ foodId: 'food1', quantity: 2 }];

    await handlePaymentSelect({
      methodId: 'qpay',
      setSelectedPayment,
      setIsWalletDrawerOpen,
      createOrder,
      userId: 'user-1',
      table: 'T-7',
      finalAmount: 17000,
      orderFood,
      orderType: 'GO' as any,
      navigate,
    });

    expect(setSelectedPayment).toHaveBeenCalledWith('qpay');

    expect(createOrder).toHaveBeenCalledWith({
      variables: {
        input: {
          user: 'user-1',
          table: 'T-7',
          totalPrice: 17000,
          FoodOrderItem: orderFood,
          orderType: 'GO',
        },
      },
    });
    expect(navigate).toHaveBeenCalledWith('/PaymentSuccess');
    expect(setIsWalletDrawerOpen).not.toHaveBeenCalled();
  });

  it('wallet үед зөвхөн drawer нээгээд, createOrder / navigate дууддаггүй', async () => {
    const createOrder = jest.fn();
    const navigate = jest.fn();
    const setSelectedPayment = jest.fn();
    const setIsWalletDrawerOpen = jest.fn();

    await handlePaymentSelect({
      methodId: 'wallet',
      setSelectedPayment,
      setIsWalletDrawerOpen,
      createOrder,
      userId: 'user-1',
      table: 'T-7',
      finalAmount: 1000,
      orderFood: [],
      orderType: 'IN' as any,
      navigate,
    });

    expect(setSelectedPayment).toHaveBeenCalledWith('wallet');
    expect(setIsWalletDrawerOpen).toHaveBeenCalledWith(true);
    expect(createOrder).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
});
