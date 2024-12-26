import ProfilePage from '@/components/profile/MainSection';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import '@testing-library/jest-dom';
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
  it('renders correctly with initial step as "profile"', () => {
    render(
      <MockedProvider mocks={[getUserByIdMock]} addTypename={false}>
        <ProfilePage />
      </MockedProvider>
    );

    fireEvent.keyDown(screen.getByTestId('select-btn'), { key: 'Enter' });
    fireEvent.keyDown(screen.getByTestId('option-images'), { key: 'Enter' });
  });
});
