import RegisterPage from '@/components/auth/RegisterPage';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the toBeInTheDocument matcher

it('should submit successfully with valid data', async () => {
  const mockOnSubmit = jest.fn();
  render(<RegisterPage onSubmit={mockOnSubmit} />);

  // Fill in valid data
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'johndoeuser' },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'john@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/phone/i), {
    target: { value: '12345678' },
  });
  fireEvent.change(screen.getByLabelText(/^password/i), {
    target: { value: 'password123' },
  });
  fireEvent.change(screen.getByLabelText(/confirm password/i), {
    target: { value: 'password123' },
  });

  // Submit the form
  const submitButton = screen.getByTestId('Register-Page-Submit-Button');
  fireEvent.click(submitButton);
  console.log(submitButton);

  // Check that no validation errors appear
});
