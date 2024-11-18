import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelsGrid } from '@/components/main';

describe('Main Hotels Grid', () => {
  it('should render the main hotels grid', () => {
    render(<HotelsGrid />);
  });
});
