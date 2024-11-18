import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Container } from '@/components/main/assets';

describe('Main Container', () => {
  it('should render the main container', () => {
    render(<Container backgroundColor="bg-white" />);
  });
});
