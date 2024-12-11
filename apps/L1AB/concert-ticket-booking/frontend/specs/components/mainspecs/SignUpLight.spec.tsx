import SignUp from '@/components/maincomponents/SignUp';
import { render, fireEvent, screen } from '@testing-library/react';

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  useAuth: jest.fn(),
}));
const props = {
  header: 'Бүртгүүлэх',
  nameLabel: 'Нэр:',
  phoneLabel: 'Утасны дугаар:',
  emailLabel: 'Имэйл хаяг:',
  passwordLabel: 'Нууц үг:',
  confirmPasswordLabel: 'Нууц үг давтах:',
  buttonText: 'Бүртгүүлэх',
  footerText: 'Та бүртгэлтэй хаягтай бол',
  footerLinkText: 'нэвтрэх',
  footerTextEnd: 'эсгээр орно уу.',
  footerLinkHref: '/signin',
};

import { useAuth } from '@/components';
import { useTheme } from 'next-themes';
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
  theme: 'dark',
}));
describe('Sign-Up Page', () => {
  let signupMock: jest.Mock;
  beforeEach(() => {
    signupMock = jest.fn();
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'light',
    }));
    (useAuth as jest.Mock).mockReturnValue({ signup: signupMock });
  });

  it('should call signup with form data on successful submission', async () => {
    signupMock.mockResolvedValueOnce({});
    const { getByTestId, getByPlaceholderText } = render(<SignUp {...props} />);

    fireEvent.change(getByPlaceholderText('Your name here ...'), { target: { value: 'Test User' } });
    fireEvent.change(getByPlaceholderText('Your phone number here ...'), { target: { value: '1234567890' } });
    fireEvent.change(getByPlaceholderText('name@example.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Нууц үг:'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Нууц үг давтах:'), { target: { value: 'password123' } });

    fireEvent.click(getByTestId('clickSubmit'));

    expect(signupMock).toHaveBeenCalledWith({
      name: 'Test User',
      phone: '1234567890',
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should display error message on failed signup', async () => {
    signupMock.mockRejectedValueOnce(new Error('Server error'));
    const { getByTestId, getByPlaceholderText } = render(<SignUp {...props} />);

    fireEvent.change(getByPlaceholderText('Your name here ...'), { target: { value: 'Test User' } });
    fireEvent.change(getByPlaceholderText('Your phone number here ...'), { target: { value: '1234567890' } });
    fireEvent.change(getByPlaceholderText('name@example.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Нууц үг:'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Нууц үг давтах:'), { target: { value: 'password123' } });

    fireEvent.click(getByTestId('clickSubmit'));

    await screen.findByText('Server error');
  });

  it('should validate and display errors for invalid fields', async () => {
    const { getByTestId } = render(<SignUp {...props} />);

    fireEvent.click(getByTestId('clickSubmit'));

    expect(screen.getByText('Name is required.'));
    expect(screen.getByText('Phone number is required.'));
    expect(screen.getByText('Email is required.'));
    expect(screen.getByText('Password is required.'));
  });
  it('should validate password length max 6', async () => {
    const { getByTestId } = render(<SignUp {...props} />);
    fireEvent.change(screen.getByLabelText('Нууц үг:'), { target: { value: 'passw' } });
    fireEvent.change(screen.getByLabelText('Нууц үг давтах:'), { target: { value: 'ad' } });
    fireEvent.click(getByTestId('clickSubmit'));

    expect(screen.getByText('Password must be at least 6 characters.'));
  });
  it('should validate password not match ', async () => {
    const { getByTestId } = render(<SignUp {...props} />);
    fireEvent.change(screen.getByLabelText('Нууц үг:'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Нууц үг давтах:'), { target: { value: 'pasword123' } });
    fireEvent.click(getByTestId('clickSubmit'));

    expect(screen.getByText('Passwords do not match.'));
  });
});
