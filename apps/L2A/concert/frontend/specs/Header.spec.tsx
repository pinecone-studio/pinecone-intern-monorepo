import Header from '@/app/_components/Header';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('should render Header component', () => {
    render(<Header />);
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    expect(screen.getByText(/Бүртгүүлэх/i)).toBeInTheDocument();
    expect(screen.getByText(/Нэвтрэх/i)).toBeInTheDocument();
    expect(screen.getByText(/TICKET BOOKING/i)).toBeInTheDocument();
  });
});
