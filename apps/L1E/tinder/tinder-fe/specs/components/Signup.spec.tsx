import Signup from '@/components/signup/Signup';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('Signup', () => {
  it('should initially render the signup step', () => {
    render(<Signup />);
    expect(screen.getByText('Create an account'));
  });

  it('should toggle to the confirm step when the button is clicked', async () => {
    render(<Signup />);
    fireEvent.click(screen.getByText('Continue'));

    expect(screen.getByText('Confirm email'));
  });
  it('should still render Forgetpassword if you click back (if there is a back button or any similar logic)', async () => {
    render(<Signup />);
  });
});
