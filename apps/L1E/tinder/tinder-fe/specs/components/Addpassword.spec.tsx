import Addpassword from '@/components/signup/Addpassword';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('Set ee hiinee hhe ', () => {
  it('should render hhe ', () => {
    render(<Addpassword />);
    expect(screen.getByText('Create password'));
  });
  it('should toggle to the confirm step when the button is clicked', async () => {
    render(<Addpassword />);

    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => expect(screen.getByTestId('continue-btn')));

    expect(screen.queryByText('Forget password'));
    expect(screen.getByText('Continue'));
  });

  it('should still render Forgetpassword if you click back (if there is a back button or any similar logic)', async () => {
    render(<Addpassword />);
  });
});
