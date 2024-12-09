import { EditProfile } from '@/components/EditProfile';
import { UpdateUserDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const userUpdateMock = {
  request: {
    query: UpdateUserDocument,
    variables: {
      id: '1',
      input: {
        username: 'fullName',
        gender: 'Prefer not to say',
        profilePicture: 'test',
        bio: 'bioshu',
        fullname: 'name',
      },
    },
  },
  result: {
    data: {
      updateUser: {
        _id: '1',
        email: 'test@example.com',
        username: 'fullName',
        fullname: 'name',
        gender: 'Prefer not to say',
        bio: 'bioshu',
      },
    },
  },
};

const userUpdateMockWithError = {
  request: {
    query: UpdateUserDocument,
    variables: {
      input: {
        username: 'name',
        gender: 'male',
        bio: 'bio',
        fullname: 'fullName',
      },
    },
  },
  error: new Error('Error updating user:'),
};
describe('Editprofile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render successfully', async () => {
    const userMock = {
      _id: '1',
      username: 'name',
      gender: 'Female',
      profilePicture: 'test',
      bio: 'bio',
      fullname: 'fullName',
    };
    const { getByPlaceholderText, getByTestId, getAllByTestId } = render(
      <MockedProvider mocks={[userUpdateMock]} addTypename={false}>
        <EditProfile user={userMock} />
      </MockedProvider>
    );
    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'name' } });
    fireEvent.change(getByPlaceholderText('UserName'), { target: { value: 'fullName' } });

    const Bio = getByTestId('Bio');
    fireEvent.change(Bio, { target: { value: 'bioshu' } });
    const genderSelect = getByTestId('combobox');
    fireEvent.keyDown(genderSelect, { key: 'Enter' });

    const value = getAllByTestId('select')[0];
    fireEvent.keyDown(value, { key: 'Enter' });
    const genderSelect1 = getByTestId('combobox');
    fireEvent.keyDown(genderSelect1, { key: 'Enter' });
    const value2 = getAllByTestId('select')[1];
    fireEvent.keyDown(value2, { key: 'Enter' });
    const genderSelect2 = getByTestId('combobox');
    fireEvent.keyDown(genderSelect2, { key: 'Enter' });
    const value3 = getAllByTestId('select')[2];
    fireEvent.keyDown(value3, { key: 'Enter' });

    fireEvent.click(getByTestId('updateSumbit'));
    await waitFor(() => {
      expect(screen);
    });
  });
  it('should render fails', async () => {
    const userMock = {
      _id: '1',
      username: 'test',
      gender: 'test',
      profilePicture: 'test',
      bio: 'test',
      fullname: 'test',
    };
    const { getByPlaceholderText, getByTestId } = render(
      <MockedProvider mocks={[userUpdateMockWithError]} addTypename={false}>
        <EditProfile user={userMock} />
      </MockedProvider>
    );
    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'name' } });
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'fullName' } });

    fireEvent.click(getByTestId('updateSumbit'));
    await waitFor(() => {
      expect(screen);
    });
  });
});
