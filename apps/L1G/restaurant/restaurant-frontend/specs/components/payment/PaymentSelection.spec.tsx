/** @jest-environment jsdom */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { useCreateFoodOrderMutation } from '@/generated';
import { handlePaymentSelect, handleWalletOrder } from '@/utils/Payment-Logic';
import PaymentSelection from '@/components/payment/PaymentSelection';
import '@testing-library/jest-dom';

// ---- env shims --------------------------------------------------------------
if (!globalThis.localStorage) {
  const store = new Map<string, string>();
  // @ts-expect-error test shim
  globalThis.localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => {
      store.set(k, String(v));
    },
    removeItem: (k: string) => {
      store.delete(k);
    },
    clear: () => {
      store.clear();
    },
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size;
    },
  };
}
// @ts-expect-error test shim
if (typeof window !== 'undefined' && typeof window.scrollTo === 'undefined') {
  window.scrollTo = () => {};
}
// @ts-expect-error test shim
if (typeof navigator !== 'undefined' && !navigator.clipboard) {
  navigator.clipboard = {
    writeText: jest.fn().mockResolvedValue(undefined),
    readText: jest.fn().mockResolvedValue(''),
  };
}

// ---- mocks ------------------------------------------------------------------
jest.mock('next/navigation');
jest.mock('jsonwebtoken');
jest.mock('@/generated');
jest.mock('@/utils/Payment-Logic');

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, ...props }: any) => (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  ),
}));

// Controlled <select> mock (prevents duplicate placeholder text in DOM)
jest.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <div data-testid="select-container">
      <select data-testid="delivery-select" value={value ?? ''} onChange={(e) => onValueChange(e.target.value)}>
        {children}
      </select>
    </div>
  ),
  SelectContent: ({ children }: any) => <>{children}</>,
  SelectItem: ({ value, children }: any) => <option value={value}>{children}</option>,
  SelectTrigger: ({ children }: any) => <div>{children}</div>,
  // Do NOT render placeholder text to avoid “сонгоно уу” duplicates
  SelectValue: () => null,
}));

jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children, open, onOpenChange }: any) => (
    <div data-testid="wallet-sheet" style={{ display: open ? 'block' : 'none' }}>
      <button onClick={() => onOpenChange(false)} data-testid="close-sheet">
        Close
      </button>
      {children}
    </div>
  ),
  SheetContent: ({ children }: any) => <div>{children}</div>,
  SheetHeader: ({ children }: any) => <div>{children}</div>,
  SheetTitle: ({ children }: any) => <h2>{children}</h2>,
}));

jest.mock('@/components/ui/input', () => ({
  Input: ({ value, onChange, ...props }: any) => <input value={value} onChange={onChange} data-testid="wallet-amount-input" {...props} />,
}));

// Mock PaymentCard BEFORE importing the component in tests
jest.mock('@/components/payment/PaymentCard', () => {
  return function PaymentCard({ method, selectedPayment, handlePaymentSelect }: any) {
    return (
      <button data-testid={`payment-card-${method.id}`} onClick={() => handlePaymentSelect(method.id)} className={selectedPayment === method.id ? 'selected' : ''}>
        {method.name}
      </button>
    );
  };
});

// ---- helpers for mocks ------------------------------------------------------
const mockPush = jest.fn();
const mockCreateOrder = jest.fn();

const mockHandleWalletOrder = handleWalletOrder as jest.MockedFunction<typeof handleWalletOrder>;
const mockHandlePaymentSelect = handlePaymentSelect as jest.MockedFunction<typeof handlePaymentSelect>;

// Use a spy–able localStorage so we can change return values per test
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('PaymentSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useCreateFoodOrderMutation as jest.Mock).mockReturnValue([mockCreateOrder]);
    (jwt.decode as jest.Mock).mockReturnValue({ user: { _id: 'user123' } });

    // Defaults
    mockLocalStorage.getItem.mockImplementation((key) => {
      switch (key) {
        case 'orderData':
          // (5000 * 2) + (3000 * 1) = 13000
          return JSON.stringify({
            items: [
              { id: 'food1', price: 5000, selectCount: 2 },
              { id: 'food2', price: 3000, selectCount: 1 },
            ],
            orderType: 'GO',
          });
        case 'token':
          return 'mock-token';
        case 'tableId':
          return '5';
        default:
          return null;
      }
    });
  });

  // --------------------------------------------------------------------------
  // Component Rendering
  // --------------------------------------------------------------------------
  describe('Component Rendering', () => {
    it('renders the component with correct title', () => {
      render(<PaymentSelection />);

      // Avoid duplicate match with “сонгоно уу” by scoping to the heading:
      expect(
        screen.getByRole('heading', {
          name: /Төлбөрийн хэрэгслээ\s+сонгоно уу/i,
        })
      ).toBeInTheDocument();
    });

    it('renders close button', () => {
      render(<PaymentSelection />);
      expect(screen.getByLabelText('Back')).toBeInTheDocument();
    });

    it('renders delivery option select', () => {
      render(<PaymentSelection />);
      expect(screen.getByTestId('delivery-select')).toBeInTheDocument();
    });

    it('renders payment method cards', () => {
      render(<PaymentSelection />);
      expect(screen.getByTestId('payment-card-qpay')).toBeInTheDocument();
      expect(screen.getByTestId('payment-card-socialpay')).toBeInTheDocument();
      expect(screen.getByTestId('payment-card-wallet')).toBeInTheDocument();
    });
  });

  // --------------------------------------------------------------------------
  // Order Data Loading
  // --------------------------------------------------------------------------
  describe('Order Data Loading', () => {
    it('loads order data from localStorage on mount', () => {
      render(<PaymentSelection />);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('orderData');
      expect(screen.getByText('13,000₮')).toBeInTheDocument(); // base
    });

    it('handles missing order data gracefully', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'orderData') return null;
        if (key === 'token') return 'mock-token';
        if (key === 'tableId') return '5';
        return null;
      });

      render(<PaymentSelection />);
      // base should be 0
      expect(screen.getByText('0₮')).toBeInTheDocument();
    });

    it('decodes JWT token to get user ID', () => {
      render(<PaymentSelection />);
      expect(jwt.decode).toHaveBeenCalledWith('mock-token');
    });
  });

  // --------------------------------------------------------------------------
  // Price Calculations
  // --------------------------------------------------------------------------
  describe('Price Calculations', () => {
    it('calculates base order amount correctly', () => {
      render(<PaymentSelection />);
      expect(screen.getByText('13,000₮')).toBeInTheDocument();
    });

    it('shows delivery fee', () => {
      render(<PaymentSelection />);
      expect(screen.getByText('4,000₮')).toBeInTheDocument();
    });

    it('calculates total amount correctly', () => {
      render(<PaymentSelection />);
      expect(screen.getByText('17,000₮')).toBeInTheDocument();
    });
  });

  // --------------------------------------------------------------------------
  // Delivery Option Selection
  // --------------------------------------------------------------------------
  describe('Delivery Option Selection', () => {
    it('sets delivery option from order data', () => {
      render(<PaymentSelection />);
      const select = screen.getByTestId('delivery-select') as HTMLSelectElement;
      expect(select).toHaveValue('GO');
    });

    it('updates delivery option when changed', async () => {
      const user = userEvent.setup();
      render(<PaymentSelection />);

      const select = screen.getByTestId('delivery-select') as HTMLSelectElement;
      await user.selectOptions(select, 'IN');
      expect(select).toHaveValue('IN');
    });
  });

  // --------------------------------------------------------------------------
  // Payment Method Selection
  // --------------------------------------------------------------------------
  describe('Payment Method Selection', () => {
    it('handles payment method selection', async () => {
      const user = userEvent.setup();
      render(<PaymentSelection />);

      await user.click(screen.getByTestId('payment-card-qpay'));

      expect(mockHandlePaymentSelect).toHaveBeenCalledWith({
        methodId: 'qpay',
        setSelectedPayment: expect.any(Function),
        setIsWalletDrawerOpen: expect.any(Function),
        createOrder: mockCreateOrder,
        userId: 'user123',
        table: '5',
        finalAmount: 17000,
        orderFood: [
          { foodId: 'food1', quantity: 2 },
          { foodId: 'food2', quantity: 1 },
        ],
        orderType: 'GO',
      });
    });

    it('opens wallet drawer when wallet is selected', async () => {
      mockHandlePaymentSelect.mockImplementation(({ setIsWalletDrawerOpen }) => {
        setIsWalletDrawerOpen(true);
      });

      const user = userEvent.setup();
      render(<PaymentSelection />);

      await user.click(screen.getByTestId('payment-card-wallet'));
      await waitFor(() => expect(screen.getByTestId('wallet-sheet')).toBeVisible());
    });
  });

  // --------------------------------------------------------------------------
  // Wallet Functionality
  // --------------------------------------------------------------------------
  describe('Wallet Functionality', () => {
    beforeEach(() => {
      mockHandlePaymentSelect.mockImplementation(({ setIsWalletDrawerOpen }) => {
        setIsWalletDrawerOpen(true);
      });
    });

    it('shows wallet sheet with correct information', async () => {
      const user = userEvent.setup();
      render(<PaymentSelection />);

      await user.click(screen.getByTestId('payment-card-wallet'));

      await waitFor(() => {
        expect(screen.getByText('Хэтэвчинд 18,864₮')).toBeInTheDocument();
        expect(screen.getByText('Төлөх дүн: 17,000₮')).toBeInTheDocument();
      });
    });

    it('handles wallet amount input (string change path)', async () => {
      const user = userEvent.setup();
      render(<PaymentSelection />);

      await user.click(screen.getByTestId('payment-card-wallet'));

      const input = await screen.findByTestId('wallet-amount-input');

      // Force string semantics to avoid number-vs-string mismatch:
      fireEvent.change(input, { target: { value: '5000' } });
      expect(input).toHaveValue(5000); // expect a number for type="number"
    });

    it('handles wallet order submission', async () => {
      const user = userEvent.setup();
      render(<PaymentSelection />);

      await user.click(screen.getByTestId('payment-card-wallet'));

      const input = await screen.findByTestId('wallet-amount-input');
      fireEvent.change(input, { target: { value: '5000' } });

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

    it('closes wallet sheet', async () => {
      const user = userEvent.setup();
      render(<PaymentSelection />);

      await user.click(screen.getByTestId('payment-card-wallet'));
      await user.click(await screen.findByTestId('close-sheet'));

      await waitFor(() => expect(screen.getByTestId('wallet-sheet')).not.toBeVisible());
    });

    it('wallet option remains until component state marks it used (mocked path)', () => {
      // Just render; we don't mutate internal state here
      render(<PaymentSelection />);
      expect(screen.getByTestId('payment-card-wallet')).toBeInTheDocument();
    });
  });

  // --------------------------------------------------------------------------
  // Navigation
  // --------------------------------------------------------------------------
  describe('Navigation', () => {
    it('navigates back when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<PaymentSelection />);
      await user.click(screen.getByLabelText('Back'));
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  // --------------------------------------------------------------------------
  // Edge Cases (kept jsdom; no deleting window)
  // --------------------------------------------------------------------------
  describe('Edge Cases', () => {
    it('handles missing JWT token', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return null;
        if (key === 'orderData') return JSON.stringify({ items: [], orderType: 'GO' });
        return null;
      });
      (jwt.decode as jest.Mock).mockReturnValue(null);

      render(<PaymentSelection />);
      expect(screen.getByRole('heading', { name: /Төлбөрийн хэрэгслээ/ })).toBeInTheDocument();
    });

    it('handles missing table ID', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'tableId') return null;
        if (key === 'orderData') return JSON.stringify({ items: [], orderType: 'GO' });
        if (key === 'token') return 'mock-token';
        return null;
      });

      render(<PaymentSelection />);
      expect(screen.getByRole('heading', { name: /Төлбөрийн хэрэгслээ/ })).toBeInTheDocument();
    });

  it('handles invalid order data JSON', () => {
  mockLocalStorage.getItem.mockImplementation((key) => {
    if (key === 'orderData') return 'invalid-json';
    return 'mock-value';
  });

  // Should not crash when JSON.parse fails
  expect(() => render(<PaymentSelection />)).not.toThrow();
});


  // --------------------------------------------------------------------------
  // Accessibility
  // --------------------------------------------------------------------------
  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<PaymentSelection />);
      expect(screen.getByLabelText('Back')).toBeInTheDocument();
    });

    it('has proper input attributes for wallet amount', async () => {
      const user = userEvent.setup();
      render(<PaymentSelection />);

      await user.click(screen.getByTestId('payment-card-wallet'));

      await waitFor(() => {
        const input = screen.getByTestId('wallet-amount-input');
        expect(input).toHaveAttribute('type', 'number');
        expect(input).toHaveAttribute('min', '0');
        // 13,000 base + 4,000 fee = 17,000
        expect(input).toHaveAttribute('max', '17000');
      });
    });
  });
});
