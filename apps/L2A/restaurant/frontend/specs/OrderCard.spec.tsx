import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import OrderCard from '@/app/admin/_components/OrderCard';

describe('OrderCard', () => {
  it('renders the order details correctly', () => {
    render(<OrderCard />);
    expect(screen.getByText('Хүснэгт 3')).toBeInTheDocument();
    expect(screen.getByText('#12345')).toBeInTheDocument();
    expect(screen.getByText('12:30 PM')).toBeInTheDocument();
    expect(screen.getByText('Бургер')).toBeInTheDocument();
    expect(screen.getByText('500₮ × 2')).toBeInTheDocument();
    expect(screen.getByText('Ундаа')).toBeInTheDocument();
    expect(screen.getByText('Нийлбэр дүн:')).toBeInTheDocument();
    expect(screen.getByText('2000₮')).toBeInTheDocument();
    expect(screen.getByText('Дэлгэрэнгүй харах')).toBeInTheDocument();
  });
});
