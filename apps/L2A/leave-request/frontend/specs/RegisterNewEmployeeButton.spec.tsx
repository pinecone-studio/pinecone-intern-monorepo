import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegisterNewEmployeeButton } from '@/app/admin/_components/Button';
import '@testing-library/jest-dom';


describe('RegisterNewEmployeeButton', () => {
  it('renders with correct text', () => {
    render(<RegisterNewEmployeeButton onClick={jest.fn()} />);
    expect(screen.getByRole('button', { name: '+ Шинэ ажилтан бүртгэх' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<RegisterNewEmployeeButton onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button', { name: '+ Шинэ ажилтан бүртгэх' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
