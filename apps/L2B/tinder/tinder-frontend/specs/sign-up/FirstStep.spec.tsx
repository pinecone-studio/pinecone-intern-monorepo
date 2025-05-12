import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FirstStep from '@/app/auth/sign-up/_components/FirstStep';

describe('FirstStep component (react-hook-form + zod)', () => {
  const setup = () => {
    const setEmail = jest.fn();
    const setStep = jest.fn();

    render(<FirstStep setEmail={setEmail} setStep={setStep} />);
    const emailInput = screen.getByPlaceholderText('name@example.com');
    const submitButton = screen.getByTestId('submit');

    return { emailInput, submitButton, setEmail, setStep };
  };

  it('компонентыг зөв рендер хийж байгаа эсэхийг шалгана', () => {
    setup();
    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument();
  });

  it('буруу имэйл оруулахад алдааны мессеж харуулна', async () => {
    const { emailInput, submitButton } = setup();

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it('зөв имэйл оруулахад setEmail ба setStep дуудагдана', async () => {
    const { emailInput, submitButton, setEmail, setStep } = setup();
    const validEmail = 'test@example.com';

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(setEmail).toHaveBeenCalledWith(validEmail);
      expect(setStep).toHaveBeenCalledWith(2);
    });

    expect(screen.queryByText(/invalid email/i)).toBeNull();
  });
});
