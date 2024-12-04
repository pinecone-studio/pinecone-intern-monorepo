import SignUp from '@/components/maincomponents/SignUp';
import { render, fireEvent, screen } from '@testing-library/react';

describe('Sign-Up-Page', () => {
  it('should render the sign-up form with all fields', async () => {
    const { getByTestId } = render(
      <SignUp
        header="Бүртгүүлэх"
        nameLabel="Нэр:"
        phoneLabel="Утасны дугаар:"
        emailLabel="Имэйл хаяг:"
        passwordLabel="Нууц үг:"
        confirmPasswordLabel="Нууц үг давтах:"
        buttonText="Бүртгүүлэх"
        footerText="Та бүртгэлтэй хаягтай бол"
        footerLinkText="нэвтрэх"
        footerTextEnd="эсгээр орно уу."
        footerLinkHref="/signin"
      />
    );
    const clickSubmit = getByTestId('clickSubmit');
    fireEvent.click(clickSubmit);
  });

  it('should display error message if passwords do not match', async () => {
    const { getByTestId } = render(
      <SignUp
        header="Бүртгүүлэх"
        nameLabel="Нэр:"
        phoneLabel="Утасны дугаар:"
        emailLabel="Имэйл хаяг:"
        passwordLabel="Нууц үг:"
        confirmPasswordLabel="Нууц үг давтах:"
        buttonText="Бүртгүүлэх"
        footerText="Та бүртгэлтэй хаягтай бол"
        footerLinkText="нэвтрэх"
        footerTextEnd="эсгээр орно уу."
        footerLinkHref="/signin"
      />
    );

    fireEvent.change(screen.getByLabelText('Нууц үг:'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Нууц үг давтах:'), { target: { value: 'password456' } });

    fireEvent.click(getByTestId('clickSubmit'));

    expect(screen.getByText('Passwords do not match'));
  });
});
