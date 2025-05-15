const setupGraphQLIntercepts = () => {
  cy.intercept('POST', '/api/graphql', (req) => {
    const body = req.body;
    if (body.query.includes('requestPasswordReset')) {
      req.reply({
        data: {
          requestPasswordReset: {
            success: true,
            message: 'Reset email sent',
          },
        },
      });
      return;
    }
    if (body.query.includes('verifyPasswordResetOTP')) {
      req.reply({
        data: {
          verifyPasswordResetOTP: {
            success: true,
            message: 'OTP verified',
          },
        },
      });
      return;
    }
    if (body.query.includes('resetPassword')) {
      req.reply({
        data: {
          resetPassword: {
            success: true,
            message: 'Password reset successful',
          },
        },
      });
      return;
    }
  }).as('graphql');
};
export { setupGraphQLIntercepts };
