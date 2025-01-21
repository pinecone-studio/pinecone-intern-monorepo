import { SignUp } from '@/components/sign-up/SignUp';
import { render } from '@testing-library/react';
describe('SignUp ', () => {
  it('SignUp  render successfully', async () => {
    render(<SignUp />);
  });
});
