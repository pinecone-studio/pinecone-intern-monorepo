import { PasswordResetPage } from '@/components/passwordResert/PasswordReset';
import { render } from '@testing-library/react';
describe('PasswordResetPage ', () => {
  it('PasswordResetPage  render successfully', async () => {
    render(<PasswordResetPage />);
  });
});
