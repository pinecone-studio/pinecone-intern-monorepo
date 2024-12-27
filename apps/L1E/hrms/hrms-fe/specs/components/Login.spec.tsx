import { render } from '@testing-library/react';

import Login from '@/components/login/Login';

describe('Login', () => {
  it('should Login', async () => {
    render(<Login />);
  });
});
