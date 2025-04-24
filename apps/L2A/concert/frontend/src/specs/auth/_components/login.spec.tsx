import { Login } from '@/app/auth/_components/Login';
import { render } from '@testing-library/react';

describe('render login.tsx', () => {
  it('render login component', () => {
    render(<Login />);
  });
});
