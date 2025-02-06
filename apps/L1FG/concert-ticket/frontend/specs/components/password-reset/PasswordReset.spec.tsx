import { PasswordReset } from '@/components/passwordReset/PasswordReset';
import { render } from '@testing-library/react';
describe('PasswordResetPage ', () => {
  it('PasswordResetPage  render successfully', async () => {
    render(<PasswordReset />);
  });
});
