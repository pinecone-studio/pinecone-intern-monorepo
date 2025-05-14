import ForgetPassword from '@/app/userProfile/[id]/_features/ForgetPassword';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('ForgetPassword Component', () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the form with email, current password, new password and confirm password fields', () => {
    render(<ForgetPassword />);

    expect(screen.getByLabelText(/Имэйл:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Хуучин нууц үг:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Шинэ нууц үг:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Шинэ нууц үг давтах:/)).toBeInTheDocument();
  });

  it('should show alert if new password and confirm password do not match', async () => {
    render(<ForgetPassword />);

    fireEvent.change(screen.getByLabelText(/Шинэ нууц үг:/), { target: { value: 'newPassword123' } });
    fireEvent.change(screen.getByLabelText(/Шинэ нууц үг давтах:/), { target: { value: 'differentPassword' } });

    fireEvent.click(screen.getByRole('button', { name: /Хадгалах/ }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Шинэ нууц үг таарахгүй байна!');
    });
  });

  it('should show success alert if the form is submitted successfully', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true }),
    });

    render(<ForgetPassword />);

    fireEvent.change(screen.getByLabelText(/Имэйл:/), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Хуучин нууц үг:/), { target: { value: 'oldPassword123' } });
    fireEvent.change(screen.getByLabelText(/Шинэ нууц үг:/), { target: { value: 'newPassword123' } });
    fireEvent.change(screen.getByLabelText(/Шинэ нууц үг давтах:/), { target: { value: 'newPassword123' } });

    fireEvent.click(screen.getByRole('button', { name: /Хадгалах/ }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Нууц үг амжилттай шинэчлэгдлээ!');
    });
  });

  it('should show error alert if the API returns an error', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: 'Алдаа гарлаа.' }),
    });

    render(<ForgetPassword />);

    fireEvent.change(screen.getByLabelText(/Имэйл:/), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Хуучин нууц үг:/), { target: { value: 'oldPassword123' } });
    fireEvent.change(screen.getByLabelText(/Шинэ нууц үг:/), { target: { value: 'newPassword123' } });
    fireEvent.change(screen.getByLabelText(/Шинэ нууц үг давтах:/), { target: { value: 'newPassword123' } });

    fireEvent.click(screen.getByRole('button', { name: /Хадгалах/ }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Алдаа гарлаа.');
    });
  });
});
