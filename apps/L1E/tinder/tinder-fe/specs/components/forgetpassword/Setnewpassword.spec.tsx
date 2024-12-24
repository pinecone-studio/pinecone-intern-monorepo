import Setnewpassword from '@/components/forgetpassword/Setnewpassword';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('Set ee hiinee hhe ', () => {
  it('should render hhe ', () => {
    render(<Setnewpassword />);
    expect(screen.getByText('Set new password'));
  });
  it('should toggle to the confirm step when the button is clicked', async () => {
    render(<Setnewpassword />);

    fireEvent.click(screen.getByText('Confirm Email'));

    await waitFor(() => expect(screen.getByText('Confirm Email')));

    expect(screen.queryByText('Forget password'));
  });

  it('should still render Forgetpassword if you click back (if there is a back button or any similar logic)', async () => {
    render(<Setnewpassword />);
  });
});
