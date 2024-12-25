import { render } from '@testing-library/react';

import Login from '@/components/Login/Login';

describe('Login', () => {
  it('should Login', async () => {
    render(<Login />);
  });
});
