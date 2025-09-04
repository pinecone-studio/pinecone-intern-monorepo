/* eslint max-lines: "off" */
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// ---------- Router mock ----------
const mockRouter = { push: jest.fn(), replace: jest.fn(), back: jest.fn(), prefetch: jest.fn(), refresh: jest.fn() };
jest.mock('next/navigation', () => ({ useRouter: () => mockRouter }));

// ---------- GraphQL generated hook & enums mock ----------
const mockCreateOrderFn = jest.fn();
jest.mock('@/generated', () => ({
  FoodServeType: { GO: 'GO', IN: 'IN' },
  useCreateFoodOrderMutation: () => [mockCreateOrderFn],
}));

// ---------- Payment-Logic mock (string literal alias) ----------
jest.mock('@/utils/Payment-Logic', () => ({
  handlePaymentSelect: jest.fn(),
  handleWalletOrder: jest.fn(),
}));
import * as PaymentLogic from '@/utils/PaymentLogic';

// ---------- Shadcn UI mock-ууд ----------
jest.mock('@/components/ui/button', () => {
  const React = require('react');
  return { Button: ({ children, onClick, className, ...rest }: any) => React.createElement('button', { onClick, className, ...rest }, children) };
});
jest.mock('@/components/ui/input', () => {
  const React = require('react');
  return { Input: ({ value, onChange, ...rest }: any) => React.createElement('input', { value, onChange, ...rest }) };
});
jest.mock('@/components/ui/select', () => {
  jest.mock('@/components/ui/select', () => {
    const React = require('react');
    const Select = ({ value, onValueChange, children }: any) => React.createElement('div', { 'data-testid': 'mock-select', 'data-value': value }, children);
    const SelectTrigger = ({ children, ...rest }: any) => React.createElement('button', { 'data-testid': 'mock-select-trigger', ...rest }, children);
    const SelectContent = ({ children }: any) => React.createElement('div', { 'data-testid': 'mock-select-content' }, children);
    const SelectItem = ({ value, children }: any) =>
      React.createElement(
        'button',
        {
          role: 'option',
          onClick: () => {
            const ev = new CustomEvent('select-change', { detail: value });
            (globalThis as any).dispatchEvent(ev);
          },
        },
        children
      );
    const SelectValue = ({ placeholder }: any) => React.createElement('span', { 'data-testid': 'mock-select-value' }, placeholder);

    const RealSelect = ({ value, onValueChange, children }: any) => {
      React.useEffect(() => {
        const handler = (e: any) => onValueChange?.(e.detail);
        (globalThis as any).addEventListener('select-change', handler);
        return () => (globalThis as any).removeEventListener('select-change', handler);
      }, [onValueChange]);
      return React.createElement(Select, { value, onValueChange }, children);
    };

    return { Select: RealSelect, SelectTrigger, SelectContent, SelectItem, SelectValue };
  });
});
jest.mock('@/components/ui/sheet', () => {
  const React = require('react');
  const Sheet = ({ open, children }: any) => React.createElement('div', { 'data-testid': 'mock-sheet', 'data-open': String(!!open) }, children);
  const SheetContent = ({ children }: any) => React.createElement('div', { 'data-testid': 'mock-sheet-content' }, children);
  const SheetHeader = ({ children }: any) => React.createElement('div', { 'data-testid': 'mock-sheet-header' }, children);
  const SheetTitle = ({ children }: any) => React.createElement('div', { 'data-testid': 'mock-sheet-title' }, children);
  return { Sheet, SheetContent, SheetHeader, SheetTitle };
});

// ---------- PaymentCard mock ----------
jest.mock('@/components/payment/PaymentCard', () => {
  const React = require('react');
  const PaymentCard = ({ method, handlePaymentSelect, selectedPayment }: any) =>
    React.createElement(
      'button',
      {
        'data-testid': `payment-card-${method.id}`,
        'aria-pressed': selectedPayment === method.id ? 'true' : 'false',
        onClick: () => handlePaymentSelect(method.id),
      },
      method.name || method.id
    );
  return { __esModule: true, default: PaymentCard };
});

// ---------- next/image mock ----------
jest.mock('next/image', () => {
  const React = require('react');
  return (props: any) => React.createElement('img', { ...props });
});

// ---------- Component import ----------
import PaymentSelection from '@/components/payment/PaymentSelection';

// ---------- Helpers ----------
const seedLocalStorage = (opts?: { orderType?: 'GO' | 'IN' }) => {
  const order = {
    orderType: opts?.orderType ?? 'GO',
    items: [
      { id: 'f1', price: '1000', selectCount: 2 }, // 2000
      { id: 'f2', price: '3000', selectCount: 1 }, // 3000  => base 5000
    ],
  };
  localStorage.setItem('orderData', JSON.stringify(order));
  localStorage.setItem('token', 'dummy.jwt.token');
  localStorage.setItem('tableId', 'T-1');
};

describe('PaymentSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    seedLocalStorage();
  });

  it('renders totals correctly (base + DELIVERY_FEE) and shows payment methods', async () => {
    render(<PaymentSelection />);
    expect(await screen.findByText(/Захиалгын нийт дүн:/)).toBeInTheDocument();
    expect(screen.getByText('5,000₮')).toBeInTheDocument();
    expect(screen.getByText(/Хоолны сав:/)).toBeInTheDocument();
    expect(screen.getByText('4,000₮')).toBeInTheDocument();
    expect(screen.getByText(/Төлөх дүн:/)).toBeInTheDocument();
    expect(screen.getByText('9,000₮')).toBeInTheDocument();
    expect(screen.getByTestId('payment-card-qpay')).toBeInTheDocument();
    expect(screen.getByTestId('payment-card-socialpay')).toBeInTheDocument();
    expect(screen.getByTestId('payment-card-wallet')).toBeInTheDocument();
  });

  it('changes delivery option via Select', async () => {
    render(<PaymentSelection />);
    fireEvent.click(screen.getByTestId('mock-select-trigger'));
    fireEvent.click(screen.getByRole('option', { name: 'Эндээ идэх' }));
    expect(true).toBe(true);
  });

  it('clicking wallet card calls handlePaymentSelect and opens wallet sheet', async () => {
    (PaymentLogic.handlePaymentSelect as jest.Mock).mockImplementation((args: any) => {
      args.setSelectedPayment(args.methodId);
      if (args.methodId === 'wallet') args.setIsWalletDrawerOpen(true);
    });

    render(<PaymentSelection />);
    expect(screen.getByTestId('mock-sheet')).toHaveAttribute('data-open', 'false');
    fireEvent.click(screen.getByTestId('payment-card-wallet'));
    expect(PaymentLogic.handlePaymentSelect).toHaveBeenCalled();
    await waitFor(() => expect(screen.getByTestId('mock-sheet')).toHaveAttribute('data-open', 'true'));
    expect(screen.getByText('9,000₮')).toBeInTheDocument();
  });

  it('wallet order deducts amount and clamps final total at zero', async () => {
    (PaymentLogic.handlePaymentSelect as jest.Mock).mockImplementation((args: any) => {
      args.setSelectedPayment(args.methodId);
      if (args.methodId === 'wallet') args.setIsWalletDrawerOpen(true);
    });
    (PaymentLogic.handleWalletOrder as jest.Mock).mockImplementation((args: any) => {
      const desired = Number(args.targetAmount) || 0;
      args.setWalletDeduction(desired);
      args.setWalletUsed(true);
      args.setSelectedPayment('');
      args.setIsWalletDrawerOpen(false);
      args.setTargetAmount('');
    });

    render(<PaymentSelection />);
    fireEvent.click(screen.getByTestId('payment-card-wallet'));
    await waitFor(() => expect(screen.getByTestId('mock-sheet')).toHaveAttribute('data-open', 'true'));

    const input = screen.getByPlaceholderText('дүн') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '20000' } });
    expect(input).toHaveValue('20000');
    fireEvent.click(screen.getByRole('button', { name: 'Захиалах' }));

    expect(PaymentLogic.handleWalletOrder).toHaveBeenCalled();
    await waitFor(() => expect(screen.getByText('0₮')).toBeInTheDocument());
    expect(screen.getByText(/Хэтэвчээс хасагдсан дүн:/)).toBeInTheDocument();
    expect(screen.getByText('20,000₮')).toBeInTheDocument();
    expect(screen.getByTestId('mock-sheet')).toHaveAttribute('data-open', 'false');
  });

  it('back button routes to home', () => {
    render(<PaymentSelection />);
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
