import LoginPage from '@/components/auth/LoginPage';
import { render } from '@testing-library/react';

describe('it should render successfully', () => {
  it('should render LoginPage', () => {
    const onSubmit = (_values: { email: string; password: string }) => {
      // intentionally left empty for testing
    };
    render(<LoginPage onSubmit={onSubmit} />);
  });
});
