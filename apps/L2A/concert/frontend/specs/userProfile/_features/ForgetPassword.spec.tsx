import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ForgetPassword from '@/app/userProfile/[id]/_features/ForgetPassword';
import '@testing-library/jest-dom';
describe('ForgetPassword component', () => {
  beforeEach(() => {
    window.alert = jest.fn();
    render(<ForgetPassword />);
  });

  it('should update input values', () => {
    const currentInput = screen.getByLabelText(/Хуучин нууц үг:/i);
    const newInput = screen.getByLabelText(/Шинэ нууц үг:/i);
    const confirmInput = screen.getByLabelText(/Шинэ нууц үг давтах:/i);
    fireEvent.change(currentInput, { target: { value: 'oldpass' } });
    fireEvent.change(newInput, { target: { value: 'newpass' } });
    fireEvent.change(confirmInput, { target: { value: 'newpass' } });
    expect(currentInput).toHaveValue('oldpass');
    expect(newInput).toHaveValue('newpass');
    expect(confirmInput).toHaveValue('newpass');
  });

  it('should alert if passwords do not match', () => {
    fireEvent.change(screen.getByLabelText(/Шинэ нууц үг:/i), { target: { value: 'password1' } });
    fireEvent.change(screen.getByLabelText(/Шинэ нууц үг давтах:/i), { target: { value: 'password2' } });
    fireEvent.click(screen.getByText(/Хадгалах/i));
    expect(window.alert).toHaveBeenCalledWith('Шинэ нууц үг таарахгүй байна!');
  });

  it('should alert success if passwords match', () => {
    fireEvent.change(screen.getByLabelText(/Шинэ нууц үг:/i), { target: { value: 'samepassword' } });
    fireEvent.change(screen.getByLabelText(/Шинэ нууц үг давтах:/i), { target: { value: 'samepassword' } });
    fireEvent.click(screen.getByText(/Хадгалах/i));
    expect(window.alert).toHaveBeenCalledWith('Нууц үг амжилттай шинэчлэгдлээ!');
  });
});
