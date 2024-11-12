import { Container } from '@/components/providers';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Container', () => {
  it('should render successfully', async () => {
    render(<Container />);
  });
});
