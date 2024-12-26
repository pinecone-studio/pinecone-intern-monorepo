import { fireEvent, render, screen } from '@testing-library/react';
import { GetUserByIdDocument } from '@/generated';
import { ProfileSection } from '@/components/profile/Profile';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

describe('ProfileSection', () => {
  const mockData = {
    getUserById: {
      _id: '67651d55fbc9ebc1f0d53267',
      username: 'testuser',
      email: 'test@example.com',
      interest: 'coding',
      bio: 'This is my bio.',
      profession: 'Developer',
      job: 'Engineer',
      age: '30',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
  };

  const getUserByIdMock: MockedResponse = {
    request: {
      query: GetUserByIdDocument,
      variables: { userId: '67651d55fbc9ebc1f0d53267' },
    },
    result: {
      data: mockData,
    },
  };
  it('should render successfully with data', async () => {
    render(
      <MockedProvider mocks={[getUserByIdMock]} addTypename={false}>
        <ProfileSection />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('age'), { target: { value: '31' } });
    fireEvent.change(screen.getByTestId('profession'), { target: { value: 'Designer' } });
    fireEvent.change(screen.getByTestId('work'), { target: { value: 'Manager' } });
  });
});
