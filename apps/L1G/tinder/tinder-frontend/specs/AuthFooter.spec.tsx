import { AuthFooter } from '@/components/AuthFooter';
import { render } from '@testing-library/react';

describe('Auth pages - footer', () => {
  it('renders without crashing', () => {
    render(<AuthFooter />);
  });
});
