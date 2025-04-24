import { VerificationCode } from '@/app/auth/_components/VerifcationCode';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

global.ResizeObserver = class {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
};

describe('render verificationcode.tsx', () => {
  it('render verificationcode component', () => {
    render(<VerificationCode />);

    expect(screen.getByText(/Имэйл хаяг руу илгээсээн 4 оронтой кодыг оруулна уу./i)).toBeInTheDocument();
  });
});
