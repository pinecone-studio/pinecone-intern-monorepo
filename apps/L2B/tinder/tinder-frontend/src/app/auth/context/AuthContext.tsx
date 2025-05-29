'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Profile, useFetchProfileQuery, useGetCurrentUserQuery, useSignInMutation } from '@/generated';
import { toast } from 'sonner';
import Loading from '@/app/_components/Loading';


type UserType = {
  email: string;
  password?: string | null;
  createdAt: string;
  updatedAt: string;
  _id: string;
  verficationCode: string;
  __typename: string;
  isVerified: boolean;
};

type valuesType = {
  email: string;
  password: string;
};

type AuthContextType = {
  logout: () => void;
  user: UserType | null;
  handleSignIn: (_values: valuesType) => void;
  signInLoading: boolean;
  currentProfile: Profile | undefined;
  JWT: string;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);
  const [JWT, setJWT] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const [signInMutation, { loading: signInLoading }] = useSignInMutation({
    onError: (error) => {
      console.error('Sign-in error:', error);
      toast.error('Invalid email or password');
    },
  });

  useEffect(() => {
    const storedJWT = localStorage.getItem('token');
    if (storedJWT) {
      setJWT(storedJWT);
    }
  }, []);

  const { data } = useGetCurrentUserQuery({
    variables: { jwt: JWT },
    skip: !JWT,
  });

  const { data: profileData } = useFetchProfileQuery({
    variables: { id: user?._id ?? '' },
    skip: !user?._id,
  });

  const currentProfile: any | undefined = profileData?.fetchProfile;

  const handleSignIn = async (values: valuesType) => {
    const { data } = await signInMutation({ variables: values });
    const token = data?.signIn;

    if (token) {
      localStorage.setItem('token', token);
      setJWT(token);
      toast.success('Login successful');
      router.push('/swipe-page');
    }
  };

  useEffect(() => {
    if (data?.getCurrentUser) {
      const userData = {
        ...data.getCurrentUser,
        createdAt: data.getCurrentUser.createdAt,
        updatedAt: data.getCurrentUser.updatedAt,
        __typename: data.getCurrentUser.__typename,
        isVerified: data.getCurrentUser.isVerified,
      };
      setUser(userData as UserType);
    }
    setLoading(false);
  }, [data]);

  if (loading) {
    return <Loading />;
  }
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/sign-in');
  };

  return <AuthContext.Provider value={{ logout, user, handleSignIn, signInLoading, currentProfile, JWT }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthContext };