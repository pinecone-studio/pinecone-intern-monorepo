import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupFooter from '@/app/signup/_components/SignUpFooter';

describe('SignUpFooter', () => {
  it('renders terms and links only on step 1', () => {
    render(<SignupFooter step={1} />);
    expect(screen.getByText('OR')).toBeInTheDocument();
    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('does not render terms or links on step 2 or 3', () => {
    render(<SignupFooter step={2} />);
    expect(screen.queryByText('OR')).not.toBeInTheDocument();
    render(<SignupFooter step={3} />);
    expect(screen.queryByText('Create an account')).not.toBeInTheDocument();
  });

  it('always shows copyright', () => {
    render(<SignupFooter step={1} />);
    expect(screen.getByText('©2024 Home Vault')).toBeInTheDocument();
  });
});
