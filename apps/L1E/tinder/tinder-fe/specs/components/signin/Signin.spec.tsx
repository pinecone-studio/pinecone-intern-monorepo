import Signin from '@/components/signin/Signin';
import { render, screen } from '@testing-library/react';

describe('Signin', () => {
  it('should render my signin', () => {
    render(<Signin />);
    expect(screen.getByText('Sign in'));
  });
});
