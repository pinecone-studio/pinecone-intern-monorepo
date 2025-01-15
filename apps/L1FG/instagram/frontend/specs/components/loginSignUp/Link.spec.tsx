import { TroubleLoggingIn } from '@/components/log-in/Link';
import { render } from '@testing-library/react';
describe('LogInPage', () => {
  it('Should render', () => {
    render(<TroubleLoggingIn />);
  });
});
