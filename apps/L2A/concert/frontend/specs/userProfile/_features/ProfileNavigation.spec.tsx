import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfileContainer from '@/app/userProfile/[id]/_features/ProfileNavigation';

jest.mock('@/app/userProfile/[id]/_features/UserProfile', () => {
  const MockUserProfile = () => <div data-testid="user-profile">User Profile Component</div>;
  return MockUserProfile;
});
jest.mock('@/app/userProfile/[id]/_features/OrderHistory', () => {
  const MockOrderHistory = () => <div data-testid="order-history-content">Order History Component</div>;
  return { __esModule: true, default: MockOrderHistory };
});
jest.mock('@/app/userProfile/[id]/_features/ForgetPassword', () => {
  const MockForgetPassword = () => <div data-testid="forget-password">Forget Password Component</div>;
  return MockForgetPassword;
});

describe('UserProfileContainer', () => {
  const orderId = 'order-123';
  beforeEach(() => {
    render(<UserProfileContainer orderId={orderId} />);
  });

  it('should render UserProfile by default', () => {
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
  });

  it('should render OrderHistory when Захиалгын түүх tab is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /Захиалгын түүх/i }));
    expect(screen.getByTestId('order-history-content')).toBeInTheDocument();
  });

  it('should render ForgetPassword when Нууц үг сэргээх tab is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /Нууц үг сэргээх/i }));
    expect(screen.getByTestId('forget-password')).toBeInTheDocument();
  });

  it('should switch back to UserProfile when Хэрэглэгчийн мэдээлэл tab is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /Захиалгын түүх/i }));
    fireEvent.click(screen.getByRole('button', { name: /Хэрэглэгчийн мэдээлэл/i }));
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
  });
});
