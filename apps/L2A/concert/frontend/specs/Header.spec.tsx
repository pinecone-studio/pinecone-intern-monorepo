import { render } from '@testing-library/react';
import Header from '../src/app/_components/Header';
describe('Header', () => {
  it('renders header', () => {
    render(<Header />);
  });
});
