import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from '@/components/profile/MainSection';
import '@testing-library/jest-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetUserByIdDocument } from '@/generated';

const getUserByIdMock: MockedResponse = {
  request: {
    query: GetUserByIdDocument,
    variables: { userId: '67651d55fbc9ebc1f0d53267' },
  },
  result: {
    data: {
      getUserById: {},
    },
  },
};

describe('ProfilePage Component', () => {
  beforeEach(() => {
    // Mocking localStorage before each test
    const mockUserData = {
      username: 'testuser',
      email: 'testuser@example.com',
    };
    localStorage.setItem('user', JSON.stringify(mockUserData));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders user data from localStorage and initial step is "profile"', async () => {
    render(
      <MockedProvider mocks={[getUserByIdMock]} addTypename={false}>
        <ProfilePage />
      </MockedProvider>
    );

    // Wait for the component to load user data
    await waitFor(() => expect(screen.getByText('Hi, testuser')));

    // Check that the profile section is rendered initially
    // expect(screen.getByTestId('username')).toHaveTextContent('Hi, testuser');
    // expect(screen.getByTestId('setstep')).toBeInTheDocument();

    // Ensure that the username from localStorage is rendered
    // expect(screen.getByText('testuser'));
    // expect(screen.getByText('testuser@example.com'));
  });

  // it('should show an error message when there is no user data in localStorage', async () => {
  //   localStorage.removeItem('user');

  //   render(
  //     <MockedProvider mocks={[getUserByIdMock]} addTypename={false}>
  //       <ProfilePage />
  //     </MockedProvider>
  //   );

  //   await waitFor(() => expect(console.error)('Хэрэглэгчийн өгөгдөл олдсонгүй.'));
  // });

  it('changes the step to "images" when the button is clicked', async () => {
    render(
      <MockedProvider mocks={[getUserByIdMock]} addTypename={false}>
        <ProfilePage />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText('Hi, testuser')));

    fireEvent.keyDown(screen.getByTestId('select-btn'), { key: 'Enter' });
    fireEvent.keyDown(screen.getByTestId('option-images'), { key: 'Enter' });

    await waitFor(() => expect(screen.getByText('Images Section')));
  });
});
