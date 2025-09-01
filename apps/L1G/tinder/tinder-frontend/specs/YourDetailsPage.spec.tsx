import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { YourDetailsPage } from '@/components/YourDetailsPage';

jest.mock('@/components/FormNew', () => ({
  ProfileForm: () => <div data-testid="profile-form">Mock Profile Form</div>,
}));

jest.mock('@/components/TitleContainer', () => ({
  __esModule: true,
  default: ({ boldTitle, greyText }: { boldTitle: string; greyText: string }) => (
    <div data-testid="title-container">
      <h1>{boldTitle}</h1>
      <p>{greyText}</p>
    </div>
  ),
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
  beforeEach(() => {
    // Clear mocks before each test to ensure isolation
    jest.clearAllMocks();
  });

  it('should display correct title', () => {
    render(<YourDetailsPage onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    const titleElement = screen.getByText('Your Details');
    expect(titleElement).toBeInTheDocument();
    expect(screen.getByTestId('title-container')).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(<YourDetailsPage onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    const description = screen.getByText('Please provide the following information to help us get to know you better.');
    expect(description).toBeInTheDocument();
    expect(screen.getByTestId('title-container')).toBeInTheDocument();
  });

  it('should render ProfileForm with correct props', () => {
    render(<YourDetailsPage onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    const profileForm = screen.getByTestId('profile-form');
    expect(profileForm).toBeInTheDocument();
    expect(profileForm).toHaveTextContent('Mock Profile Form');
  });

  it('should render the container with correct test id', () => {
    render(<YourDetailsPage onSuccess={mockOnSuccess} onBack={mockOnBack} userData={userData} updateUserData={mockUpdateUserData} />);

    const container = screen.getByTestId('details-page-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('w-[340px] md:w-[400px] h-full md:h-fit flex flex-col items-center justify-center bg-background px-4');
  });
});
