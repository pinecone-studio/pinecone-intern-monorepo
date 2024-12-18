import Signup from '@/components/signup/Signup';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('Signup Component', () => {
  it('should initially render the signup step', () => {
    render(<Signup />);
    expect(screen.getByText(/create an account/i));
  });

  it('should toggle to the confirm step when the "Continue" button is clicked', async () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const continueButton = screen.getByTestId('continue-btn');
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(screen.getByText(/confirm email/i));
    });
  });

  it('should not toggle if the email is invalid', async () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const continueButton = screen.getByTestId('continue-btn');
    fireEvent.click(continueButton);
  });

  it('should update the email state on input change', async () => {
    render(<Signup />);
  });

  it('should go back to the previous step if "Back" button is clicked', async () => {
    render(<Signup />);

    const continueButton = screen.getByTestId('continue-btn');
    fireEvent.click(continueButton);
  });
});
