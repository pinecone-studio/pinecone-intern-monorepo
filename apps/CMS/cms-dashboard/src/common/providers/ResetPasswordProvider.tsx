/* eslint-disable no-unused-vars */

'use client';

import { PropsWithChildren, useContext, createContext, useState, Dispatch, SetStateAction } from 'react';
import { useResetPasswordMutation, useSendMailMutation } from '../../generated';
import { toast } from 'react-toastify';
import { ApolloError } from '@apollo/client';

type ResetPasswordContextType = {
  handleSendMail: (emailOrPhoneNumber: string) => Promise<void>;
  handleResetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  sendMailLoading: boolean;
  resetPasswordLoading: boolean;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
};

export const ResetPasswordContext = createContext<ResetPasswordContextType>({} as ResetPasswordContextType);

export const ResetPasswordProvider = ({ children }: PropsWithChildren) => {
  const [sendMail, { loading: sendMailLoading }] = useSendMailMutation();
  const [resetPassword, { loading: resetPasswordLoading }] = useResetPasswordMutation();
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendMail = async (emailOrPhoneNumber: string) => {
    try {
      const { data: sendMailData } = await sendMail({
        variables: {
          email: emailOrPhoneNumber,
        },
      });
      toast.success(sendMailData?.sendMail.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.graphQLErrors[0].message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };

  const handleResetPassword = async (email: string, code: string, newPassword: string) => {
    try {
      const { data: resetPasswordData } = await resetPassword({
        variables: {
          email,
          code,
          newPassword,
        },
      });
      toast.success(resetPasswordData?.resetPassword.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.graphQLErrors[0].message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };

  return (
    <ResetPasswordContext.Provider
      value={{
        handleSendMail,
        handleResetPassword,
        sendMailLoading,
        resetPasswordLoading,
        index,
        setIndex,
        email,
        setEmail,
        otp,
        setOtp,
      }}
    >
      {children}
    </ResetPasswordContext.Provider>
  );
};

export const useResetPassword = () => {
  return useContext(ResetPasswordContext);
};
