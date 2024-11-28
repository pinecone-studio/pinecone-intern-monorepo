import SignIn from '@/components/maincomponents/SignIn';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

describe('Sign-In-Page', () => {
  it('should render sign-in form with all fields', async () => {
    const { getByTestId } = render(
      <SignIn
        header="Нэвтрэх"
        emailLabel="Имэйл хаяг:"
        passwordLabel="Нууц үг:"
        recoveryLinkText="Нууц үг сэргээх"
        recoveryLinkHref="/recovery"
        buttonText="Нэвтрэх"
        footerText="Та бүртгэлтэй хаяггүй бол"
        footerLinkText="бүртгүүлэх"
        footerTextEnd="хэсгээр
орно уу."
        footerLinkHref="/signup"
      />
    );

    const clickSubmit = getByTestId('clickSubmit');
    fireEvent.click(clickSubmit);
  });

  it('should toggle the password visibility', () => {
    render(
      <SignIn
        header="Нэвтрэх"
        emailLabel="Имэйл хаяг:"
        passwordLabel="Нууц үг:"
        recoveryLinkText="Нууц үг сэргээх"
        recoveryLinkHref="/recovery"
        buttonText="Нэвтрэх"
        footerText="Та бүртгэлтэй хаяггүй бол"
        footerLinkText="бүртгүүлэх"
        footerTextEnd="хэсгээр орно уу."
        footerLinkHref="/signup"
      />
    );

    const passwordInput = screen.getByLabelText(/Нууц үг:/);
    const toggleVisibility = screen.getByTestId('toggleVisibility');

    expect(passwordInput).toHaveAttribute('type', 'password');

    act(() => {
      fireEvent.click(toggleVisibility);
    });
    expect(passwordInput).toHaveAttribute('type', 'text');

    act(() => {
      fireEvent.click(toggleVisibility);
    });
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should update form data when email or password changes', () => {
    render(
      <SignIn
        header="Нэвтрэх"
        emailLabel="Имэйл хаяг:"
        passwordLabel="Нууц үг:"
        recoveryLinkText="Нууц үг сэргээх"
        recoveryLinkHref="/recovery"
        buttonText="Нэвтрэх"
        footerText="Та бүртгэлтэй хаяггүй бол"
        footerLinkText="бүртгүүлэх"
        footerTextEnd="хэсгээр орно уу."
        footerLinkHref="/signup"
      />
    );

    const emailInput = screen.getByLabelText(/Имэйл хаяг:/);
    const passwordInput = screen.getByLabelText(/Нууц үг:/);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
});
