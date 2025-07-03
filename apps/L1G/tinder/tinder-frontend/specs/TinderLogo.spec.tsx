import TinderLogo from '@/components/TinderLogo';
import { render } from '@testing-library/react';

describe('TinderLogo', () => {
  it('renders without crashing', () => {
    render(<TinderLogo />);
  });
});
