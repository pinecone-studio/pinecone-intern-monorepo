import React from 'react';
import { render, screen } from '@testing-library/react';
import YourDetailsPage from '@/components/YourDetailsPage';
import '@testing-library/jest-dom';

const mockOnSuccess = jest.fn();
const mockOnBack = jest.fn();
describe('YourDetailsPage Component', () => {
  beforeEach(() => {
    render(<YourDetailsPage onSuccess={mockOnSuccess} onBack={mockOnBack} />);
  });

  it('should display correct title', () => {
    const titleElement = screen.getByRole('heading', { name: /Your Details/i });
    expect(titleElement);
  });

  it('should render description text', () => {
    const description = screen.getByText(/Please provide the following information/i);
    expect(description);
  });

  it('should render ProfileForm component', () => {
    const formElement = screen.getByTestId('profile-form');
    expect(formElement);
  });
});
