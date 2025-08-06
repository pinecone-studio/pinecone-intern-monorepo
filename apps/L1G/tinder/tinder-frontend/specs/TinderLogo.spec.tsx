import { TinderLogo, WhiteTinderLogo } from '@/components/TinderLogo';
import { render } from '@testing-library/react';

describe('TinderLogo', () => {
  it('renders without crashing', () => {
    render(<TinderLogo />);
  });

  it('renders white logo without crashing', () => {
    render(<WhiteTinderLogo />);
  });
});
