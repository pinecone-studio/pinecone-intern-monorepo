import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Header } from '../../src/components';

describe('Header', () => {
  it('should render successfully', async () => {
    render(<Header />);
  });
});
