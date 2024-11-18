import { ForgetPassword } from '@/components/ForgetPassword';
import { render } from '@testing-library/react';

describe('ForgetPassword', () => {
  it('should render successfully', async () => {
    render(<ForgetPassword />);
  });
});
