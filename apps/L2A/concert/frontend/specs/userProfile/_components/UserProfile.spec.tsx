import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfile from '@/app/userProfile/[id]/_components/UserProfile';

describe('UserProfile component', () => {
  it('renders input fields and button', () => {
    render(<UserProfile />);

    expect(screen.getByLabelText(/Утасны дугаар:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Имэйл хаяг:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Хадгалах/i })).toBeInTheDocument();
  });

  it('allows valid phone number input only', () => {
    render(<UserProfile />);
    const phoneInput = screen.getByLabelText(/Утасны дугаар:/i) as HTMLInputElement;

    fireEvent.change(phoneInput, { target: { value: '9900-0000' } });
    expect(phoneInput.value).toBe('9900-0000');

    fireEvent.change(phoneInput, { target: { value: '9900-0000abc' } });
    // утга нь үл өөрчлөгдөнө (invalid тэмдэгт орж ирвэл)
    expect(phoneInput.value).toBe('9900-0000');
  });

  it('updates email input value correctly', () => {
    render(<UserProfile />);
    const emailInput = screen.getByLabelText(/Имэйл хаяг:/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('calls handleSave and logs phone/email on button click', () => {
    console.log = jest.fn(); // console.log spy

    render(<UserProfile />);
    const phoneInput = screen.getByLabelText(/Утасны дугаар:/i);
    const emailInput = screen.getByLabelText(/Имэйл хаяг:/i);
    const button = screen.getByRole('button', { name: /Хадгалах/i });

    fireEvent.change(phoneInput, { target: { value: '99119911' } });
    fireEvent.change(emailInput, { target: { value: 'hello@test.mn' } });
    fireEvent.click(button);

    expect(console.log).toHaveBeenCalledWith('Phone:', '99119911');
    expect(console.log).toHaveBeenCalledWith('Email:', 'hello@test.mn');
  });
});
