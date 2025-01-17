import { render } from '@testing-library/react';
import Header from '../../src/components/common/Header';

describe('Header', () => {
  it('Header renders successfully', async () => {
    render(<Header />);
  });
});
