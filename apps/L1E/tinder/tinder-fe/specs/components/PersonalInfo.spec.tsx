import PersonalInfo from '@/components/profile/PersonalInfo';
import { fireEvent, render, screen } from '@testing-library/react';

describe('PersonalInfo Component', () => {
  it('should render successfully', () => {
    // Mock user data
    const mockUser = {
      username: 'John Doe',
      email: 'john.doe@example.com',
    };

    render(<PersonalInfo user={mockUser} />);

    fireEvent.change(screen.getByTestId('name'), { target: { value: 'test' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test' } });
  });
});
