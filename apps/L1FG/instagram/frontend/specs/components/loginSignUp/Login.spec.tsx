import { LogInPage } from '@/components/log-in/LogInPage';
import { render } from '@testing-library/react';
describe('LogInPage', () => {
  it('Should render', () => {
    render(<LogInPage />);
  });
});
