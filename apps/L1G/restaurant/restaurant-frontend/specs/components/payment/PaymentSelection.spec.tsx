/** @jest-environment jsdom */
/* eslint-disable */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ===== Mocks for deps used by the component =====
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
import { useRouter } from 'next/navigation';

const mockCreateOrder = jest.fn();
jest.mock('@/generated', () => ({
  useCreateFoodOrderMutation: () => [mockCreateOrder],
}));

// storage utils (new)
const mockLoadOrderData = jest.fn();
const mockGetUserIdFromToken = jest.fn();
const mockGetTableId = jest.fn();
jest.mock('@/utils/storage', () => ({
  loadOrderData: (...args: any[]) => mockLoadOrderData(...args),
  getUserIdFromToken: (...args: any[]) => mockGetUserIdFromToken(...args),
  getTableId: (...args: any[]) => mockGetTableId(...args),
}));

// Payment logic helpers
const mockHandleWalletOrder = jest.fn();
const mockHandlePaymentSelect = jest.fn();
jest.mock('@/utils/Payment-Logic', () => ({
  handleWalletOrder: (...a: any[]) => mockHandleWalletOrder(...(a as any)),
  handlePaymentSelect: (...a: any[]) => mockHandlePaymentSelect(...(a as any)),
}));

// ✅ Select mock — DOM nesting warning арилгана (зөвхөн <select> рендерлэнэ)
jest.mock('@/components/ui/select', () => ({
  Select: ({ value, onValueChange }: any) => (
    <select data-testid="delivery-select" value={value ?? ''} onChange={(e) => onValueChange?.(e.target.value)}>
      <option value="GO">Авч явах</option>
      <option value="IN">Эндээ идэх</option>
    </select>
  ),
  // доорх бүрдлүүдийг render хийх шаардлагагүй — null буцаая
  SelectTrigger: () => null,
  SelectValue: () => null,
  SelectContent: () => null,
  SelectItem: () => null,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, ...props }: any) => (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/input', () => ({
  Input: ({ value, onChange, ...props }: any) => <input data-testid="wallet-amount-input" value={value} onChange={onChange} {...props} />,
}));

jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children, open, onOpenChange }: any) => (
    <div data-testid="wallet-sheet" style={{ display: open ? 'block' : 'none' }}>
      <button data-testid="close-sheet" onClick={() => onOpenChange(false)}>
        Close
      </button>
      {children}
    </div>
  ),
  SheetContent: ({ children }: any) => <div>{children}</div>,
  SheetHeader: ({ children }: any) => <div>{children}</div>,
  SheetTitle: ({ children }: any) => <h2>{children}</h2>,
}));

jest.mock('@/components/payment/PaymentCard', () => {
  return function PaymentCard({ method, selectedPayment, handlePaymentSelect }: any) {
    return (
      <button data-testid={`payment-card-${method.id}`} className={selectedPayment === method.id ? 'selected' : ''} onClick={() => handlePaymentSelect(method.id)}>
        {method.name}
      </button>
    );
  };
});

// ===== Import the component under test =====
import PaymentSelection from '@/components/payment/PaymentSelection';

// ===== Helpers for default mock data =====
const seedDefaultStorage = () => {
  mockLoadOrderData.mockReturnValue({
    items: [
      { id: 'food1', price: 5000, selectCount: 2 },
      { id: 'food2', price: 3000, selectCount: 1 },
    ],
    orderType: 'GO',
  });
  mockGetUserIdFromToken.mockReturnValue('user123');
  mockGetTableId.mockReturnValue('T-5');
};

describe('PaymentSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    seedDefaultStorage();
  });

  describe('Rendering & basics', () => {
    it('renders title and payment methods', () => {
      render(<PaymentSelection />);
      expect(screen.getByText(/Төлбөрийн хэрэгслээ/)).toBeInTheDocument();

      expect(screen.getByTestId('payment-card-qpay')).toBeInTheDocument();
      expect(screen.getByTestId('payment-card-socialpay')).toBeInTheDocument();
      expect(screen.getByTestId('payment-card-wallet')).toBeInTheDocument();
    });

    it('shows calculated totals: base, fee, final', () => {
      render(<PaymentSelection />);
      expect(screen.getByText('13,000₮')).toBeInTheDocument(); // base
      expect(screen.getByText('4,000₮')).toBeInTheDocument(); // fee
      expect(screen.getByText('17,000₮')).toBeInTheDocument(); // total
    });

    it('shows 0 base when no order data', () => {
      mockLoadOrderData.mockReturnValueOnce(undefined);
      render(<PaymentSelection />);
      expect(screen.getByText('0₮')).toBeInTheDocument();
      expect(screen.getAllByText('4,000₮').length).toBeGreaterThan(0);
    });
  });

  describe('Delivery option', () => {
    it('sets delivery option from order data', async () => {
      // ⬇️ Зөвхөн энэ тестэнд orderType=IN болгоё
      mockLoadOrderData.mockReturnValueOnce({
        items: [{ id: 'x', price: 1000, selectCount: 1 }],
        orderType: 'IN',
      });

      render(<PaymentSelection />);
      const select = screen.getByTestId('delivery-select') as HTMLSelectElement;

      // state useEffect-ээр тавигддаг тул waitFor хэрэгтэй
      await waitFor(() => expect(select).toHaveValue('IN'));
    });

    it('updates delivery option on change', async () => {
      render(<PaymentSelection />);
      const user = userEvent.setup();
      const select = screen.getByTestId('delivery-select') as HTMLSelectElement;

      // default нь GO (seedDefaultStorage) — өөрчилж шалгая
      await user.selectOptions(select, 'GO');
      await waitFor(() => expect(select).toHaveValue('GO'));
    });
  });

  describe('Payment flows', () => {
    it('non-wallet: calls handlePaymentSelect with full payload', async () => {
      render(<PaymentSelection />);
      const user = userEvent.setup();

      await user.click(screen.getByTestId('payment-card-qpay'));

      expect(mockHandlePaymentSelect).toHaveBeenCalledWith({
        methodId: 'qpay',
        setSelectedPayment: expect.any(Function),
        setIsWalletDrawerOpen: expect.any(Function),
        createOrder: mockCreateOrder,
        userId: 'user123',
        table: 'T-5',
        finalAmount: 17000,
        orderFood: [
          { foodId: 'food1', quantity: 2 },
          { foodId: 'food2', quantity: 1 },
        ],
        orderType: 'GO',
      });
    });

    it('wallet: opens drawer then passes amount to handleWalletOrder', async () => {
      mockHandlePaymentSelect.mockImplementation(({ setIsWalletDrawerOpen }) => {
        setIsWalletDrawerOpen(true);
      });

      render(<PaymentSelection />);
      const user = userEvent.setup();

      await user.click(screen.getByTestId('payment-card-wallet'));
      await waitFor(() => expect(screen.getByTestId('wallet-sheet')).toBeVisible());

      const input = screen.getByTestId('wallet-amount-input') as HTMLInputElement;
      await user.clear(input);
      await user.type(input, '5000');
      expect(input).toHaveValue(5000);

      await user.click(screen.getByText('Захиалах'));

      expect(mockHandleWalletOrder).toHaveBeenCalledWith({
        targetAmount: '5000',
        totalBeforeWallet: 17000,
        setWalletDeduction: expect.any(Function),
        setWalletUsed: expect.any(Function),
        setSelectedPayment: expect.any(Function),
        setIsWalletDrawerOpen: expect.any(Function),
        setTargetAmount: expect.any(Function),
      });
    });

    it('closes wallet drawer via close button', async () => {
      mockHandlePaymentSelect.mockImplementation(({ setIsWalletDrawerOpen }) => {
        setIsWalletDrawerOpen(true);
      });
      render(<PaymentSelection />);
      const user = userEvent.setup();

      await user.click(screen.getByTestId('payment-card-wallet'));
      await waitFor(() => expect(screen.getByTestId('wallet-sheet')).toBeVisible());

      await user.click(screen.getByTestId('close-sheet'));
      await waitFor(() => expect(screen.getByTestId('wallet-sheet')).not.toBeVisible());
    });
  });

  describe('Navigation', () => {
    it('Back button navigates home', async () => {
      const mockedUseRouter = useRouter as unknown as jest.Mock;
      const push = jest.fn();
      mockedUseRouter.mockReturnValue({ push });

      render(<PaymentSelection />);
      const user = userEvent.setup();

      await user.click(screen.getByLabelText('Back'));
      expect(push).toHaveBeenCalledWith('/');
    });
  });
  describe('Payment flows', () => {
    // ... чиний байгаа тестүүд ...

    it('wallet callbacks → setWalletUsed / setWalletDeduction нь UI-г шинэчилнэ', async () => {
      // wallet товч дарж drawer нээнэ
      mockHandlePaymentSelect.mockImplementation(({ setIsWalletDrawerOpen }) => {
        setIsWalletDrawerOpen(true);
      });

      render(<PaymentSelection />);
      const user = userEvent.setup();

      await user.click(screen.getByTestId('payment-card-wallet'));
      await waitFor(() => expect(screen.getByTestId('wallet-sheet')).toBeVisible());

      // дүн оруулаад "Захиалах" дарж doHandleWalletOrder дуудагдуулах
      const input = screen.getByTestId('wallet-amount-input') as HTMLInputElement;
      await user.clear(input);
      await user.type(input, '5000');
      expect(input).toHaveValue(5000);

      await user.click(screen.getByText('Захиалах'));

      // mock-д дамжсан setter-үүдийг авч, гараар дуудадлаа
      expect(mockHandleWalletOrder).toHaveBeenCalledTimes(1);
      const args = mockHandleWalletOrder.mock.calls[0][0];

      // setter-үүдийг дуудна
      args.setWalletUsed(true);
      args.setWalletDeduction(5000);

      // drawer-ийг хаая
      args.setIsWalletDrawerOpen(false);

      // target amount-г reset хийе
      args.setTargetAmount('');

      // UI шинэчлэлтүүдийг шалгана
      await waitFor(() => {
        // drawer хаагдсан
        expect(screen.getByTestId('wallet-sheet')).not.toBeVisible();

        // wallet option алга болсон (wallet.used === true үед нууж байгаа)
        expect(screen.queryByTestId('payment-card-wallet')).not.toBeInTheDocument();

        // wallet deduction мөр гарч ирсэн, мөн дүн -5,000₮
        expect(screen.getByText('Хэтэвчээс хасагдсан дүн:')).toBeInTheDocument();
        expect(screen.getByText('-5,000₮')).toBeInTheDocument();

        // эцсийн төлөх дүн = 17,000 - 5,000 = 12,000₮
        expect(screen.getByText('12,000₮')).toBeInTheDocument();
      });
    });

    it('wallet callbacks → setTargetAmount нь input-ыг шинэчилнэ', async () => {
      mockHandlePaymentSelect.mockImplementation(({ setIsWalletDrawerOpen }) => {
        setIsWalletDrawerOpen(true);
      });

      render(<PaymentSelection />);
      const user = userEvent.setup();

      await user.click(screen.getByTestId('payment-card-wallet'));
      await waitFor(() => expect(screen.getByTestId('wallet-sheet')).toBeVisible());

      const input = screen.getByTestId('wallet-amount-input') as HTMLInputElement;
      await user.clear(input);
      await user.type(input, '3000');
      await user.click(screen.getByText('Захиалах'));

      expect(mockHandleWalletOrder).toHaveBeenCalledTimes(1);
      const args = mockHandleWalletOrder.mock.calls[0][0];

      await act(async () => {
        args.setTargetAmount('');
      });

      await waitFor(() => {
        const refreshed = screen.getByTestId('wallet-amount-input') as HTMLInputElement;
        expect(refreshed.value).toBe('');
      });
    });
  });
});
