import { PasswordResetPage } from '@/components/password-resert/PasswordReset';
import { render } from '@testing-library/react';
describe('PasswordResetPage ', () => {
  it('PasswordResetPage  render successfully', async () => {
    render(<PasswordResetPage />);
  });
});
