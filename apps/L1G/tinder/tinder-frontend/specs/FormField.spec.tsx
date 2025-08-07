import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // ensure matchers like ork
import ProfileForm from '@/components/FormFIeld';

describe('ProfileForm Component', () => {
  beforeEach(() => {
    render(<ProfileForm />);
  });

  it('should render all form fields', () => {
    expect(screen.getByLabelText('Name'));
    expect(screen.getByLabelText('Bio'));
    expect(screen.getByTestId('multi-select-trigger'));
    expect(screen.getByLabelText('Profession'));
    expect(screen.getByLabelText('School/Work'));
  });

  it('should allow valid form submission', async () => {
    const nameInput = screen.getByLabelText('Name');
    const submitButton = screen.getByRole('button', { name: /Next/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/Name must be at least 2 characters/i)).toBeNull();
    });
  });

  it('should render back and next buttons', () => {
    expect(screen.getByRole('button', { name: /Back/i }));
    expect(screen.getByRole('button', { name: /Next/i }));
  });
});
