import { Login } from '@/app/auth/_components/Login';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('render login.tsx', () => {
  it('render login component', () => {
    render(<Login />);

    expect(screen.getByText(/Имэйл хаяг:/i)).toBeInTheDocument();
  });
});
