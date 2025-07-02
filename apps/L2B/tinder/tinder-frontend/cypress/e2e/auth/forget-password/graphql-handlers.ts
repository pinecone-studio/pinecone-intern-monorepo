export const handleSendForgotOtp = (req: any) => {
  return req.reply({
    data: { sendForgotOtp: true },
  });
};

export const handleForgotMatchOtp = (req: any, variables: any) => {
  const ok = variables.email === 'test@example.com' && variables.otp === '1234';
  return req.reply({
    data: { forgotMatchOtp: ok ? 'success' : 'failed' },
  });
};

export const handleForgotPassword = (req: any) => {
  return req.reply({
    data: {
      forgotPassword: {
        success: true,
        message: 'Password reset successful',
      },
    },
  });
};
