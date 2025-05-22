import { handleSendForgotOtp, handleForgotMatchOtp, handleForgotPassword } from './graphql-handlers';

const operationHandlers: Record<string, (_req: any, _variables?: any) => void> = {
  SendForgotOtp: (req) => handleSendForgotOtp(req),
  ForgotMatchOtp: (req, variables) => handleForgotMatchOtp(req, variables),
  ForgotPassword: (req) => handleForgotPassword(req),
  ResetPassword: (req) => handleForgotPassword(req),
};

const interceptOperation = (operationName: string, _req: any, _variables: any) => {
  const handler = operationHandlers[operationName];
  if (handler) {
    return handler(_req, _variables);
  }
};

const setupGraphQLIntercepts = () => {
  cy.intercept('POST', '/api/graphql', (req) => {
    const { operationName, variables } = req.body as any;
    interceptOperation(operationName, req, variables);
    req.alias = operationName;
  }).as('graphql');
};

export { setupGraphQLIntercepts };
