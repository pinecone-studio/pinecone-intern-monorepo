import React from 'react';
import { render, screen } from '@testing-library/react';
import YourDetailsPage from '@/components/YourDetailsPage';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';

jest.mock('@/components/FormFIeld', () => ({
  __esModule: true,
  default: () => <div data-testid="profile-form">Mock Profile Form</div>
}));

const mockOnSuccess = jest.fn();
const mockOnBack = jest.fn();

describe('YourDetailsPage Component', () => {
  it('should display correct title', () => {
    render(
      <MockedProvider>
        <YourDetailsPage onSuccess={mockOnSuccess} onBack={mockOnBack} />
      </MockedProvider>
    );
    
    const titleElement = screen.getByRole('heading', { name: /Your Details/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(
      <MockedProvider>
        <YourDetailsPage onSuccess={mockOnSuccess} onBack={mockOnBack} />
      </MockedProvider>
    );
    
    const description = screen.getByText(/Please provide the following information/i);
    expect(description).toBeInTheDocument();
  });

  it('should render ProfileForm component', () => {
    render(
      <MockedProvider>
        <YourDetailsPage onSuccess={mockOnSuccess} onBack={mockOnBack} />
      </MockedProvider>
    );
    
    const formElement = screen.getByTestId('profile-form');
    expect(formElement).toBeInTheDocument();
  });
});