import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CreatePassForm } from '@/components/main';

describe('Main Create Password Form', () => {
  it('should render the main create password form', () => {
    render(<CreatePassForm />);
  });
});
