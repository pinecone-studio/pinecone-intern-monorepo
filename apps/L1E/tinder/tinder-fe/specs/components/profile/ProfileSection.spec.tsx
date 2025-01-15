import ProfileSection from '@/components/profile/Profile';
import { GetUserByIdDocument, UpdateUserDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { act } from 'react-dom/test-utils';

const userId = '12345';

const mockUser = {
  _id: userId,
  username: 'testuser',
  email: 'test@example.com',
  interest: 'coding',
  bio: 'This is my bio.',
  profession: 'Developer',
  job: 'Engineer',
  age: '30',
  hobby: 'Hobby',
  images: ['img'],
};

const mocks = [
  {
    request: {
      query: GetUserByIdDocument,
      variables: { userId },
    },
    result: {
      data: {
        getUserById: mockUser,
      },
    },
  },
  {
    request: {
      query: UpdateUserDocument,
      variables: {
        id: '12345',
        input: {
          username: 'updatedUser',
          email: 'updatedUser',
          interest: 'updatedUser',
          hobby: 'updatedUser',
          bio: 'updatedUser',
          profession: 'updatedUser',
          job: 'updatedUser',
          age: 'updatedUser',
        },
      },
    },
    error: new Error('Шинэчлэхэд алдаа гарлаа'),
  },
  {
    request: {
      query: UpdateUserDocument,
      variables: {
        id: '12345',
        input: {
          username: 'updatedUser',
          email: 'updatedUser',
          interest: 'updatedUser',
          hobby: 'updatedUser',
          bio: 'updatedUser',
          profession: 'updatedUser',
          job: 'updatedUser',
          age: 'updatedUser',
        },
      },
    },
    result: {
      data: {
        updateUser: {
          username: 'updatedUser',
          email: 'updatedUser',
          interest: 'updatedUser',
          hobby: 'updatedUser',
          bio: 'updatedUser',
          profession: 'updatedUser',
          job: 'updatedUser',
          age: 'updatedUser',
        },
      },
    },
  },
];

describe('ProfileSection - Update Profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ _id: userId }));
    toast.success = jest.fn();
  });

  afterEach(() => {
    localStorage.clear();
  });

  const renderWithApolloProvider = () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProfileSection />
      </MockedProvider>
    );
  };

  it('should render successfully with data from the query', async () => {
    renderWithApolloProvider();

    await waitFor(() => {
      expect(screen.getByTestId('name'));
      expect(screen.getByTestId('email'));
      expect(screen.getByTestId('age'));
      expect(screen.getByTestId('bio'));
      expect(screen.getByTestId('Hobby'));
      expect(screen.getByTestId('profession'));
      expect(screen.getByTestId('work'));
    });
  });

  it('should update the profile successfully', async () => {
    renderWithApolloProvider();
    await new Promise((res) => setTimeout(res, 1000));

    await act(async () => {
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'updatedUser' } });
      fireEvent.change(screen.getByTestId('email'), { target: { value: 'updatedUser' } });
      fireEvent.change(screen.getByTestId('age'), { target: { value: 'updatedUser' } });
      fireEvent.change(screen.getByTestId('select'), { target: { value: 'updatedUser' } });
      fireEvent.change(screen.getByTestId('bio'), { target: { value: 'updatedUser' } });
      fireEvent.change(screen.getByTestId('bio'), { target: { value: 'updatedUser' } });
      fireEvent.change(screen.getByTestId('Hobby'), { target: { value: 'updatedUser' } });
      fireEvent.change(screen.getByTestId('profession'), { target: { value: 'updatedUser' } });
      fireEvent.change(screen.getByTestId('work'), { target: { value: 'updatedUser' } });
      fireEvent.click(screen.getByTestId('Update-profile'));
    });
  });
});
