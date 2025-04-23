import { Button } from '@/app/home/_components/Button';
import { render } from '@testing-library/react';

describe('Button component', () => {
  it('renders the button text', () => {
    render(<Button text="Click Me" />);
  });
});
