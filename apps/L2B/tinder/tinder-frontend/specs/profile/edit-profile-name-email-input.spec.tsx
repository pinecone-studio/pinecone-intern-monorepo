import { ProfileUsernameEmailInput } from '@/app/edit-profile/profile/_components/ProfileUsernameEmailInput';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ProfileUsernameEmailInput', () => {
  const mockUser = {
    name: 'Elon Musk',
    email: 'test@email.com',
  };

  it('renders name and email input fields with default values', () => {
    render(
      <ProfileUsernameEmailInput
        editUserdata={mockUser}
        handleChange={jest.fn()}
      />
    );

    expect(screen.getByLabelText('Name')).toHaveValue('Elon Musk');
    expect(screen.getByLabelText('Email')).toHaveValue('test@email.com');
  });

  it('calls handleChange when input values change', () => {
    const handleChange = jest.fn();
    render(
      <ProfileUsernameEmailInput
        editUserdata={mockUser}
        handleChange={handleChange}
      />
    );

    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'Jeff Bezos' } });

    expect(handleChange).toHaveBeenCalled();
  });
});
