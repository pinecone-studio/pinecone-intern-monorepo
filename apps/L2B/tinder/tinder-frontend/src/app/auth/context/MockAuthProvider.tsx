import { ReactNode } from 'react';
import { AuthContext } from './AuthContext';

export const MockAuthProvider = ({
  children,
  user = { email: 'test@example.com', _id: '123', createdAt: '', updatedAt: '', verficationCode: '', __typename: '', isVerified: true },
  signInLoading = false,
}: {
  children: ReactNode;
  user?: any;
  signInLoading?: boolean;
}) => {
  return (
    <AuthContext.Provider
      value={{
        user,
        logout: jest.fn(),
        handleSignIn: jest.fn(),
        signInLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};