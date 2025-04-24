import { VerificationCode } from '@/app/auth/_components/VerifcationCode';
import { render } from '@testing-library/react';

global.ResizeObserver = class {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
};

describe('render verificationcode.tsx', () => {
  it('render verificationcode component', () => {
    render(<VerificationCode />);
  });
});
