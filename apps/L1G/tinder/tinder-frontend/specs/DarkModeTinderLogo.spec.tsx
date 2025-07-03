import DarkModeTinderLogo from '@/components/DarkModeTinderLogo';
import { render } from '@testing-library/react';

describe('TinderLogo', () => {
  it('renders without crashing', () => {
    render(<DarkModeTinderLogo />);
  });
});
