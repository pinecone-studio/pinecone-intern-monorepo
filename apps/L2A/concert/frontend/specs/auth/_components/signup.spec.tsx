import { SignUp } from '@/app/auth/_components/SignUp';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('render signup.tsx', () => {
  it('render signup component', () => {
    render(<SignUp />);

    expect(screen.getByText(/Имэйл хаяг:/i)).toBeInTheDocument();
  });
});
