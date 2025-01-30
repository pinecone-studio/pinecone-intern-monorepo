import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaymentSuccessComp from '@/components/order/PaymentSuccComp';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return (
      <div data-testid="link-wrapper" data-href={href}>
        {children}
      </div>
    );
  },
}));

jest.mock('lucide-react', () => ({
  Check: jest.fn(() => <svg data-testid="check-icon" />),
}));

describe('PaymentSuccessComp', () => {
  beforeEach(() => {
    render(<PaymentSuccessComp />);
  });

  it('renders the success message', () => {
    const successMessage = screen.getByText('Төлбөр амжилттай төлөгдлөө');
    expect(successMessage).toBeInTheDocument();
    expect(successMessage).toHaveClass('text-[#441500]');
  });

  it('renders the check icon', () => {
    const checkIcon = screen.getByTestId('check-icon');
    expect(checkIcon).toBeInTheDocument();
  });

  it('renders the order details link', () => {
    const linkWrapper = screen.getByTestId('link-wrapper');
    expect(linkWrapper).toHaveAttribute('data-href', 'order-history');

    const orderDetailsText = screen.getByText('Захиалгын дэлгэрэнгүй харах');
    expect(orderDetailsText).toBeInTheDocument();
  });

  it('has correct main container styling', () => {
    const mainContainer = screen.getByText('Төлбөр амжилттай төлөгдлөө').closest('div')?.parentElement;
    expect(mainContainer).toHaveClass('flex flex-col items-center gap-4');
  });

  it('renders the white circle with check icon', () => {
    const circleContainer = screen.getByTestId('check-icon').closest('div');
    expect(circleContainer).toHaveClass('w-[100px] h-[100px] bg-white rounded-full');
  });
});
