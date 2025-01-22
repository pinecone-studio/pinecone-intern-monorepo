import { UserPassword } from '@/components/UserProfile/NewPassword';
import { act, fireEvent, render } from '@testing-library/react';
describe('newPassword component', () => {
  it('renders the newPassword component', async () => {
    const { getByTestId } = render(<UserPassword></UserPassword>);
    const oldPasswordInput = getByTestId('old-password');
    await act(async () => {
      fireEvent.change(oldPasswordInput, { target: { value: 'old password' } });
    });

    const newPassword = getByTestId('new-password');
    await act(async () => {
      fireEvent.change(newPassword, { target: { value: ' new password' } });
    });

    const repeatPassword = getByTestId('repeat-password');
    await act(async () => {
      fireEvent.change(repeatPassword, { target: { value: ' new password' } });
    });

    await act(async () => {
      fireEvent.click(getByTestId('save-button'));
    });

    expect(getByTestId('save-button')).toBeDefined();
  });
});
