import { Button } from '@/app/_components/Button';
import { render } from '@testing-library/react';

describe('Button component', () => {
  it('renders the button text', () => {
    render(<Button text="Click Me" />);
  });
});
