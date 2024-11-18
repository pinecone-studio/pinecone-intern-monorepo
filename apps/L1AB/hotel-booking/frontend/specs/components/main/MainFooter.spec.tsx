import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MainFooter } from '@/components/main';

describe('Main Footer', () => {
  it('should render the main footer', () => {
    render(<MainFooter />);
  });
});
