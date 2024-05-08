import { render } from '@testing-library/react';
import { SearchIcon } from '../../src/assets/icons/SearchIcon';

describe('should render search icon', () => {
  it('should check search icon exists', () => {
    const { container } = render(<SearchIcon />);
    expect(container).toBeDefined();
  });
});
