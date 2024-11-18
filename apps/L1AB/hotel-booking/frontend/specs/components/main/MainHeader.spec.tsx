import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MainHeader } from '@/components/main';

describe('Main Header', () => {
  it('should render the main header', () => {
    render(<MainHeader />);
  });
});
