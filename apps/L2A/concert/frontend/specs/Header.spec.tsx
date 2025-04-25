import { render, screen } from '@testing-library/react';
import Header from '../src/app/_components/Header';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('renders header', () => {
    render(<Header />);
    expect(screen.getByText(/Бүртгүүлэх/i)).toBeInTheDocument();
    expect(screen.getByText(/Нэвтрэх/i)).toBeInTheDocument();
    expect(screen.getByText(/TICKET BOOKING/i)).toBeInTheDocument();
  });
});
