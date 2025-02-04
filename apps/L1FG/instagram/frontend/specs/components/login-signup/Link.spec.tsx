import { PasswordReset } from '@/app/(public)/password/reset/_features/PasswordReset';
import { render } from '@testing-library/react';
describe('LogInPage', () => {
  it('Should render', () => {
    render(<PasswordReset />);
  });
});
