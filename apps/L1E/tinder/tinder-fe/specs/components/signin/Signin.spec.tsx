import Signin from '@/components/signin/Signin';
import { LoginDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
const mocks = [
  {
    request: {
      query: LoginDocument,
      variables: {
        email: 'asd',
        password: 'asd',
      },
    },
    result: {
      data: {
        login: {
          user: {
            _id: '1',
            email: 'asd',
            username: 'testuser',
            interest: 'coding',
            password: 'hashedpassword',
            hobby: 'reading',
            bio: 'A sample bio',
            profession: 'developer',
            job: 'engineer',
            age: 30,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-02T00:00:00Z',
            __typename: 'User',
          },
          token: 'sampletoken',
          __typename: 'AuthPayload',
        },
      },
    },
  },
];

describe('Signin', () => {
  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
  });
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should render my signin', () => {
    render(
      <MockedProvider mocks={mocks}>
        <Signin />
      </MockedProvider>
    );
  });
  it('should render my signin', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Signin />
      </MockedProvider>
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  });
  it('should render my signin', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <Signin />
      </MockedProvider>
    );
    const input = getByTestId('email');
    fireEvent.change(input, { target: { value: 'as' } });
  });
  it('should render my signin', () => {
    render(
      <MockedProvider mocks={mocks}>
        <Signin />
      </MockedProvider>
    );
  });
  it('should render my signin', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <Signin />
      </MockedProvider>
    );
    const btn = getByTestId('continue');
    fireEvent.click(btn);
  });
  it('should render my signin', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <Signin />
      </MockedProvider>
    );
    const input = getByTestId('password');
    const input1 = getByTestId('email');

    fireEvent.change(input, { target: { value: 'asd' } });
    fireEvent.change(input1, { target: { value: 'asd' } });

    const btn = getByTestId('continue');
    fireEvent.click(btn);
  });
  it('should render my LoginMutation', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <Signin />
      </MockedProvider>
    );
    const input = getByTestId('password');
    const input1 = getByTestId('email');

    fireEvent.change(input, { target: { value: 'asd' } });
    fireEvent.change(input1, { target: { value: 'asd' } });

    const btn = getByTestId('continue');

    await act(async () => {
      fireEvent.click(btn);
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    });
  });
});
