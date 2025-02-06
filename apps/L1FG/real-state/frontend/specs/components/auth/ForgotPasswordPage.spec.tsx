import ForgotPasswordPage from '@/components/auth/ForgotPasswordPage';
import { render } from '@testing-library/react';
import { TypeOf, ZodObject, ZodString, ZodTypeAny } from 'zod';

describe('Footer', () => {
  it('should render successfully', () => {
    render(
      <ForgotPasswordPage
        onSubmit={function (_values: TypeOf<ZodObject<{ email: ZodString }, 'strip', ZodTypeAny, { email: string }, { email: string }>>): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
  });
});
