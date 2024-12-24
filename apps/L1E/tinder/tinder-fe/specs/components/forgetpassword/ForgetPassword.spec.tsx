import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Forgetpassword from '@/components/forgetpassword/Forgetpassword';

describe('Forgetpassword', () => {
  it('should initially render the forget password step', () => {
    render(<Forgetpassword />);

    expect(screen.getByText('Forget password'));
    expect(screen.getByText('Enter your email account to reset password'));
    expect(screen.getByPlaceholderText('name@example.com'));
    expect(screen.getByText('Confirm Email'));
  });

  it('should toggle to the confirm step when the button is clicked', async () => {
    render(<Forgetpassword />);

    expect(screen.getByText('Forget password'));

    fireEvent.click(screen.getByText('Confirm Email'));

    expect(screen.queryByText('Forget password'));
  });

  it('should still render Forgetpassword if you click back (if there is a back button or any similar logic)', async () => {
    render(<Forgetpassword />);
  });
});
