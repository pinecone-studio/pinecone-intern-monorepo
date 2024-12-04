import { ForgetPassword } from '@/components/maincomponents/ForgetPassword';
import { PasswordUpdateDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

const updatePassword: MockedResponse = {
  request: {
    query: PasswordUpdateDocument,
    variables: {
      input: {
        oldPassword: '12345',
        newPassword: '123456',
      },
    },
  },
  result: {
    data: {
      passwordUpdate: {
        success: true,
        message: 'Нууц үг амжилттай шинэчлэгдлээ.',
      },
    },
  },
};

const updatePasswordWithError: MockedResponse = {
  request: {
    query: PasswordUpdateDocument,
    variables: {
      input: {
        oldPassword: '12345',
        newPassword: '1234556',
      },
    },
  },
  error: new Error('Password wrong'),
};

describe('ForgetPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  jest.mock('react-toastify', () => ({
    toast: {
      success: jest.fn(),
      error: jest.fn(),
    },
  }));
  it('should render successfully', async () => {
    const response = {
      message: 'Нууц үг амжилттай шинэчлэгдлээ.',
      success: true,
    };
    const responseFails = {
      message: 'Нууц үг таарахгүй байна.',
      success: false,
    };
    const resetFormFields = {
      setOldPassword: jest.fn(),
      setNewPassword: jest.fn(),
      setConfirmPassword: jest.fn(),
    };

    const { getByTestId } = render(
      <MockedProvider mocks={[updatePassword]} addTypename={false}>
        <ForgetPassword />
      </MockedProvider>
    );
    fireEvent.change(getByTestId('OldPassword'), { target: { value: '12345' } });
    fireEvent.click(getByTestId('eyeOne-btn'));
    fireEvent.change(getByTestId('NewPassword'), { target: { value: '123456' } });
    fireEvent.click(getByTestId('eyeTwo-btn'));
    fireEvent.change(getByTestId('ComfirmPassword'), { target: { value: '123456' } });
    fireEvent.click(getByTestId('UpdatePasswordClick'));

    await waitFor(() => {
      expect(toast.success);
      expect(toast.error);
      expect(resetFormFields);
      expect(response);
      expect(responseFails);
    });
  });
  it('should match newPassword confirmPassword', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[updatePassword]} addTypename={false}>
        <ForgetPassword />
      </MockedProvider>
    );
    fireEvent.change(getByTestId('OldPassword'), { target: { value: '12345' } });
    fireEvent.click(getByTestId('eyeOne-btn'));
    fireEvent.change(getByTestId('NewPassword'), { target: { value: '123456' } });
    fireEvent.click(getByTestId('eyeTwo-btn'));
    fireEvent.change(getByTestId('ComfirmPassword'), { target: { value: '1234567' } });
    fireEvent.click(getByTestId('UpdatePasswordClick'));
    await waitFor(() => {
      expect(toast.success);
      expect(toast.error('Шинэ нууц үг болон баталгаажуулах нууц үг таарахгүй байна.'));
    });
  });

  it('should render oldPassword', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[updatePassword]} addTypename={false}>
        <ForgetPassword />
      </MockedProvider>
    );
    fireEvent.change(getByTestId('OldPassword'), { target: { value: '1234577' } });
    fireEvent.click(getByTestId('eyeOne-btn'));
    fireEvent.change(getByTestId('NewPassword'), { target: { value: '123456' } });
    fireEvent.click(getByTestId('eyeTwo-btn'));
    fireEvent.change(getByTestId('ComfirmPassword'), { target: { value: '123456' } });
    fireEvent.click(getByTestId('UpdatePasswordClick'));
    await waitFor(() => {
      expect(toast.success);
      expect(toast.error('Сүлжээний алдаа эсвэл сервертэй холбогдож чадсангүй.'));
    });
  });
  it('should display a server-side error message when password update fails', async () => {
    const response = {
      message: 'Нууц үг таарахгүй байна.',
      success: false,
    };
    const { getByTestId } = render(
      <MockedProvider mocks={[updatePasswordWithError]} addTypename={false}>
        <ForgetPassword />
      </MockedProvider>
    );
    fireEvent.change(getByTestId('OldPassword'), { target: { value: 'wrongPassword' } });
    fireEvent.change(getByTestId('NewPassword'), { target: { value: 'newPassword123' } });
    fireEvent.change(getByTestId('ComfirmPassword'), { target: { value: 'newPassword123' } });
    fireEvent.click(getByTestId('UpdatePasswordClick'));

    await waitFor(() => {
      expect(response);
      expect(toast.error);
    });
  });
});
