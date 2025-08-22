import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { YourDetailsPage } from '@/components/YourDetailsPage';

jest.mock('@/components/FormFIeld', () => ({
  __esModule: true,
  default: () => <div data-testid="profile-form">Mock Profile Form</div>,
}));

const mockOnSuccess = jest.fn();
const mockUpdateUserData = jest.fn();
const mockOnBack = jest.fn();

const userData = {
  id: 'user-1',
  name: 'Old Name',
  bio: 'Old bio',
  interests: ['interest1'],
  profession: 'Old profession',
  schoolWork: 'Old school/work',
};

describe('YourDetailsPage Component', () => {
  it('should display correct title', () => {
    render(
      <MockedProvider>
        <YourDetailsPage onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />
      </MockedProvider>
    );

    const titleElement = screen.getByText('Your Details');
    expect(titleElement).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(
      <MockedProvider>
        <YourDetailsPage onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />
      </MockedProvider>
    );

    const description = screen.getByText('Please provide the following information to help us get to know you better.');
    expect(description).toBeInTheDocument();
  });
});
