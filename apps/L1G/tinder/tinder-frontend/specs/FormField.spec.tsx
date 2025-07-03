import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileForm from '@/components/FormFIeld';
import { z } from 'zod';

describe('ProfileForm Component', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    render(<ProfileForm />);
  });

  it('should render all form fields', () => {
    expect(screen.getByLabelText('Name'));
    expect(screen.getByLabelText('Bio'));
    expect(screen.getByLabelText('Interest'));
    expect(screen.getByLabelText('Profession'));
    expect(screen.getByLabelText('School/Work'));
  });

  it('should validate name field', async () => {
    const nameInput = screen.getByLabelText('Name');

    fireEvent.change(nameInput, { target: { value: 'a' } });
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(screen.getByText(/Name must be at least 2 characters/i));
    });
  });

  it('should allow valid form submission', async () => {
    const nameInput = screen.getByLabelText('Name');
    const submitButton = screen.getByRole('button', { name: /Next/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/Name must be at least 2 characters/i)).not;
    });
  });

  it('should render back and next buttons', () => {
    expect(screen.getByRole('button', { name: /Back/i }));
    expect(screen.getByRole('button', { name: /Next/i }));
  });
});
